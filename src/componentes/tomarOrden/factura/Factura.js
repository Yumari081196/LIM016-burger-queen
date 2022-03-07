// import { AiOutlineMinusCircle,AiOutlinePlusCircle } from "react-icons/ai";
import plus from '../../../imagenes/plus.png'
import minus2 from '../../../imagenes/minus2.png'
import './factura.scss'
import tacho from '../../../imagenes/contenedor.png'

export const Factura = ({factura,eliminarItemPedido,countPlus,countMinus,cliente,handleUserInput}) => {
  let total = 0;
  for (const objeto of factura) {
    total= total+objeto.count*objeto.precio
  }


  return (
    <div className="boxFactura">
      <div className="boxDescripcion">
        <div className="boxMesaCliente">
          <div className="BoxMC">
            <div className="boxnombreCliente">
              <h3>CLIENTE</h3>
              <input type="text" id='cliente'  value={cliente} onChange={handleUserInput}/>
            </div>
            <div className="boxnumMesa">
              <h3>MESA</h3>
              {/* <input type="text" id='numeroMesa' /> */}

              <select className="select ">
                <option className='numeroMesa' value="N°">N°</option>
                <option className='numeroMesa' value="1">01</option>
                <option className='numeroMesa' value="2">02</option>
                <option className='numeroMesa' value="3">03</option>
                <option className='numeroMesa' value="4">04</option>
                <option className='numeroMesa' value="5">05</option>
                <option className='numeroMesa' value="6">06</option>
                <option className='numeroMesa' value="7">07</option>
                <option className='numeroMesa' value="8">08</option>

              </select>
            </div>
          </div>
          
        </div> 
        <div className="boxItemOrden">
          <p>Cantidad</p>
          <p>Item</p>
          <p>Precio C/U</p>
        </div>
        <div className='boxPedidos'>
        {factura.map((pedido)=>{
          const {id, count,descripcion,precio}=pedido;
        return (<div key={id} className="boxDescripcionCadaItemOrden" id={id}>
                <section className="descripcionOrdenItem count">
                  <img src={plus} alt='plus' onClick={()=>countPlus(id)} className="plus" />
                  <p>{count}</p>
                  <img src={minus2} alt='minus' onClick={()=>countMinus(id)} className="minus" />
                </section>
                <section className="descripcionOrdenItem">
                  <p>{descripcion}</p>
                </section>
                <section className="descripcionOrdenItem">
                  <p>S/ {precio}.00</p>
                </section>
                <section className="descripcionOrdenItem">
                  <img src={tacho} alt="tacho" onClick={eliminarItemPedido}/>
                </section>
              </div>)})}
              </div>
      </div>
      <div className="boxTotal">
        <p className="boxTotalDesc">TOTAL</p>
        <span className="boxTotalDesc">s/{total}.00</span>
      </div>
    </div>

  );  
};