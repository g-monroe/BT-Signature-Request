 import * as React from 'react';

 export interface IViewProps {
     
 }
  
 export interface IViewState {
     
 }
  
 class View extends React.Component<IViewProps, IViewState> {

     render() { 
         return (  
            <h1  id = 'HeaderText'>View a Form</h1>
         );
     }
 }
  
 export default View;