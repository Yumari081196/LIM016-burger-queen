import { useState} from "react";
import { Factura } from "./factura/Factura";
import { Menu } from "./menu/Menu";
import { Modal } from "./modalExtras/modal";
import "./tomarOrden.scss";
import { obtenerDataById, subirPedidoFirestore } from "../../data/funcionesFirestore";
import { ModalNotific } from "./modalExtras/modalNotific";
import {ModalNotificOrdenVacio} from "./modalExtras/modalNotific";

export const TomarOrden = ({horaAc}) => {

  // ****************
  const [estadoModal, setEstadoModal] = useState(false);
  const [alarmBurger, setAlarm] = useState('noActive')
  const [pedidos, setPedidos] = useState([]);
  const [identificador, setId] = useState("");

  const moreClick = (id) => {
    obtenerDataById(id, "Menu").then((pedido) => {
      if (pedido.descripcion === "Hamburguesa simple" || pedido.descripcion === "Hamburguesa doble") {
        
        setEstadoModal(true);
        setId(id);

      } else {

        const p = pedidos.find((obj) => obj.id === id);
        if (p === undefined) {
          setPedidos([...pedidos, { ...pedido, count: 1,id:id }]);
        } else {
          const index =pedidos.findIndex((obj) => obj.id===id)
          let agregarCount=pedidos[index]
          agregarCount.count= agregarCount.count+1;
          setPedidos([...pedidos])
        }
      }
    });
  };

  const confirmarModal = (arrayExtras) => {
    const [burger, adicional] = arrayExtras;// burger sea requerido estrictamente y el adicional y ponerle condiciones
    console.log(identificador);
    if(burger!==''){
    obtenerDataById(identificador, "Menu").then((pedido) => {
      const p = pedidos.find((obj) => obj.id === pedido.id + burger + adicional);
      if (p === undefined) {
        setPedidos([...pedidos,
            {
              ...pedido,
              count: 1,
              descripcion: pedido.descripcion + " " + burger + " " + adicional,
              id: pedido.id + burger + adicional,
              precio:(adicional==='')?pedido.precio:pedido.precio+1
            },
          ]);

      } else {
        const index =pedidos.findIndex((obj) => obj.id===pedido.id+burger+adicional)
        let agregarCount=pedidos[index];
        agregarCount.count=agregarCount.count+1;
        setPedidos([...pedidos]);


      }
    });
    
    setEstadoModal(false);
  }else{
    setAlarm('isActive')
  }
  };

  const cancelarModal = () => {
    setAlarm('noActive')
    setEstadoModal(false);
  };



  const [cliente, setCliente] = useState("");

    // Input Field handler
    const handleUserInput = (e) => {
      setCliente(e.target.value);
    };
    // Reset Input Field handler
    const resetInputField = () => {
      setCliente("");
    };

  const subirDataPedido = () =>{
    //  cliente=document.getElementById('cliente').value;//requerido estrictamente
    let mesa=document.querySelector('.numeroMesa').value;//requerido estrictamente

    if (cliente==="" || mesa==="" ) {
      // console.log('cliente y/o mesa vaxio');
      ModalNotific()

    }else if (pedidos.length=== 0) {
      // console.log('Orden Vacia')
      ModalNotificOrdenVacio();
    }else {
      const pedidoToSubir ={
        cliente:cliente,
        mesa:mesa,
        pedidosArray:pedidos,
        hora: horaAc,
        estado:false,
      }
      subirPedidoFirestore(pedidoToSubir,'ordenes');
      setPedidos([]);
      resetInputField();
    }
  };

  const cancelarPedido = () => {
    setPedidos([])
  }


  const eliminarItemPedido = (e) =>{
    const padre =e.target.parentNode.parentNode;
    const indexE = pedidos.findIndex((obj) => obj.id===padre.id);
    setPedidos((anterior) => {
      return [...anterior.filter((obj,index) => index !== indexE)]
    })
    console.log(padre.id);
  }

  const countPlus = (id) =>{
    //const padre =e.target.parentNode.parentNode;
    const indexE = pedidos.findIndex((obj) => obj.id===id);
    let agregarCount=pedidos[indexE]
    agregarCount.count= agregarCount.count+1;
    setPedidos([...pedidos])
    console.log(indexE);
  }
  
  const countMinus = (id) =>{
    //const padre =e.target.parentNode.parentNode;
    const indexE = pedidos.findIndex((obj) => obj.id===id);
    let restarCount=pedidos[indexE]
    if (restarCount.count === 1) {
      setPedidos((anterior) => {
        return [...anterior.filter((obj,index) => index !== indexE)]
      })
    } else {
    restarCount.count= restarCount.count-1;
    setPedidos([...pedidos])
  }}

  return (
    <>
      <div className="containert">
        <div className="boxTomarOrden">
          <p className="horaAc">{horaAc}</p>
          <h4>Mesero</h4>
          <div className="boxTomarOrdenMenu">
            <div className="boxTomarOrdenMenu2">
              <Menu moreClick={moreClick} />
              <Factura factura={pedidos} eliminarItemPedido={eliminarItemPedido} countPlus={countPlus} countMinus={countMinus} cliente={cliente} handleUserInput={handleUserInput}/>
            </div>
            <div className="boxBtnTomarOrden">
              <button onClick={cancelarPedido}>CANCELAR</button>
              <button onClick={subirDataPedido}>CONFIRMAR</button>
            </div>
          </div>
        </div>
      </div>
      {estadoModal === true && (
        <Modal confirmarModal={confirmarModal} cancelarModal={cancelarModal} alarm={alarmBurger} alarmSet={setAlarm} />
      )}
        {/* <ModalNotific /> */}
    </>
  );
};