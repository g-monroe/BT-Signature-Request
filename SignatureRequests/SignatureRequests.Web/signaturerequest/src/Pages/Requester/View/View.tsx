 import * as React from 'react';

 export interface IViewProps {
     
 }
  
 export interface IViewState {
     
 }
  
 class View extends React.Component<IViewProps, IViewState> {
     state : IViewState= { }
     render() { 
         return (  
            <h3>View a Form</h3>
         );
     }
 }
  
 export default View;