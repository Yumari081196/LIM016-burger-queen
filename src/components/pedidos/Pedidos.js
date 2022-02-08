// import React from "react";
// import ReacDOM from "react-dom";
import './pedidos.scss'

const TemplatePedidosListos = ({pedidosListos}) => {
  return pedidosListos.map((pedido) => {
    return <li key={pedido.id}>
              <section className='pedidosListos'>
                <div>CLIENTE: {pedido.cliente}</div>
                <div>N° MESA: {pedido.mesa}</div>
                <div><button>Entregar</button></div>
              </section>
            </li>
  } )
}
const arrayObjPrueba =[ {
  id: 112233,
  hora: 3,
  cliente: "yumariTodo",
  mesa: 100,
  pedidosArray: [1, 2],
},
{
  id: 445566,
  hora: 3,
  cliente: "yumariTodo",
  mesa: 100,
  pedidosArray: [3, 4],
},
{
  id: 778899,
  hora: 3,
  cliente: "yumdo",
  mesa: 100,
  pedidosArray: [3, 4],
},
{
  id: 123321,
  hora: 3,
  cliente: "yumdo",
  mesa: 100,
  pedidosArray: [3, 4],
},
{
  id: 423324,
  hora: 3,
  cliente: "yumdo",
  mesa: 100,
  pedidosArray: [3, 4],
}];
export const Pedidos = () => {
  return <>
          <h4>Mesero</h4>
          <ul id='listaPedidos'>
            <p>PEDIDOS LISTOS</p>
            <TemplatePedidosListos pedidosListos={arrayObjPrueba} />
          </ul>
         </>
};