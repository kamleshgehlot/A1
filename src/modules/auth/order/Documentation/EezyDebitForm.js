import { logo } from '../../../common/Logo.js';
import { eezyDebitLogo } from '../../../common/EezyDebitLogo.js';
import { checkBoxIcon } from '../../../common/CheckBoxIcon.js';

import { getDate, getCurrentDate, getDateInDDMMYYYY, getCurrentDateDDMMYYYY } from '../../../../utils/datetime';
import { styles } from './Styles.js';


export default function layout(data,order) {

  const franchise = data.franchise;
  const products = data.product;
  const customer = data.customer[0];
  const orderType = data.flexOrder;
  const budget = data.budget[0];
  const user = data.user; 

  // console.log(franchise);
  // console.log("product", products);
  // console.log(orderType);
  // console.log(customer);
  // console.log(order);
  // console.log(data);

  var dd = {
    content: 
      [
          {
            columns: [
              { text: 'AUTHORITY TO ACCEPT\nDIRECT DEBITS\n(not to operate as an assignment or agreement)\n\nAUTHORISATION CODE\n0227418', style: styles.EezyDebitHeader1 },
              { text: '\nRentronics Auckland South', fontSize: 12, bold: true, alignment: 'center'},
              { image: eezyDebitLogo, fit: [130, 130], alignment: 'right'},
            ],            
          },          
          {
            columns: [
              { text: '________________________________', },{},
              { text: '________________________________',  alignment: 'right'},
            ],            
          },
          {
            columns: [
              { text: 'DIRECT DEBIT REQUEST', fontSize: 13},
              { text: 'Ph: 0212727933', fontSize: 8,  alignment: 'center'},
              { text: 'NEW CUSTOMER FORM', fontSize: 13, alignment: 'right' },
            ], lineHeight: 1.5,
          },
          { fillColor: '#e5edd9',             
            table: {
              widths: ['1%','15%','34%','15%','34%','1%'], 
              body: [                  
                [
                  { text: 'YOUR DETAILS', fontSize: 10, bold: true, fillColor:'#c4dea4', colSpan: 2},{},
                  { text: '| Please complete this form using a BLACK PEN. * Indicates a MANDATORY FIELD', colSpan :4, fontSize: 8, fillColor:'#c4dea4'}, {},{},{},
                ],   
                [ {},
                  { text: 'Business:', fontSize: 8, bold: true,  }, 
                  { text: 'Kiwi Appliance Rental Ltd.', colSpan :2, fontSize: 8, }, {},
                  { text: '100-451-720', fontSize: 12, bold: true, alignment: 'right' }, 
                  {},
                ], 
                [
                  {},
                  { text: 'Customer Reference:', fontSize: 8, bold: true, },
                  { text: '', fillColor:'#ffffff'},
                  { text: '', colSpan:2}, 
                  {},{},
                ],  
                [
                  {},
                  { text: '* Surname: ', fontSize: 8, bold: true, }, 
                  { text: '', fillColor:'#ffffff'},
                  { text: '* Given Name: ', fontSize: 8, bold: true, alignment: 'right'}, 
                  { text: '', fillColor:'#ffffff'},
                  {},
                ],     
                [
                  {},
                  { text: '* Mobile #: ', fontSize: 8, bold: true, }, 
                  { text: '', fillColor:'#ffffff'},
                  { text: '', colSpan:2},                  
                  {},{},
                ],                  
                [
                  {},
                  { text: '* Email: ', fontSize: 8, bold: true, },                   
                  { text: '', colSpan:3, fillColor:'#ffffff'},                  
                  {},{},{},
                ],
                [
                  {},
                  { text: '* Address: ', fontSize: 8, bold: true, },                   
                  { text: '', colSpan:3, fillColor:'#ffffff'},                  
                  {},{},{},
                ],
                [
                  {},
                  { text: '* Suburb: ', fontSize: 8, bold: true, },                   
                  { text: '', fillColor:'#ffffff'},
                  { text: '* Postcode: ', fontSize: 8, bold: true, alignment: 'right'},              
                  {
                    table:{
                      widths: ['10%','10%','10%','10%','60%'], 
                      body: [                  
                        [
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#e5edd9'}
                        ],  
                      ],
                    }, 
                    layout:{
                      vLineWidth :  function(i, node) { return 2},
                      paddingTop:  function(i, node) { return 8; },
                      paddingBottom: function(i, node) { return 8; },              
                      vLineColor: function (i, node) { return '#e5edd9' },
                      hLineColor: function (i, node) { return '#e5edd9' },
                    }
                  },
                  {},
                ],
              ],
            },            
            layout: {
              paddingTop:  function(i, node) { return 4; },
              paddingBottom: function(i, node) { return 4; },              
              vLineWidth :  function(i, node) { return 0},
              hLineWidth :  function(i, node) { return (i===0 || i===1 ) ? 1 : 6 },
              hLineColor: function (i, node) {
                return (i === 1 ) ? '#619d5a' : '#e5edd9';
              },
              // vLineColor: function (i, node) {                
              //   return (i === 1) ? '#619d5a' : '#e5edd9';
              // },
            }, 
          },
          '\n',
          { fillColor: '#e5edd9',
            table: {
              widths: ['1%','20%','35%','43%','1%'],
              body: [                  
                [                  
                  { text: 'DEBIT ARRANGEMENT', fontSize: 10, bold: true, colSpan : 2, fillColor:'#c4dea4',},{},
                  { text: 'Including payment details and associated fees/charges detailed below and/or the total amount billed for the specified period for this and any other subsequent agreements or amendments between me/us and the Business and/or Ezidebit', colSpan :3, fontSize: 7, fillColor:'#c4dea4'}, {},{}
                ],
                [  
                  {},
                  {
                    table:{
                      widths: ['5%','95%'], 
                      body: [                  
                        [
                          { text:'', fillColor:'#ffffff',},
                          // { text:'', fillColor:'#e5edd9', border: [false, false, false, false]},
                          { text:'\t\t\t\tOnce Only Debit', fontSize: 7, fillColor:'#e5edd9', bold: true, border: [false, false, false, false]}
                        ],  
                      ],
                    },                     
                  },                  
                  { alignment:'left',
                    table:{
                    widths: ['60%','6%','6%','2%','6%','6%','2%','6%','6%'],
                    body: [                  
                      [
                        { text:'On Date: ', fontSize: 7, fillColor:'#e5edd9', bold: true, },
                        { text:'', fillColor:'#ffffff'}, 
                        { text:'', fillColor:'#ffffff'},
                        { text:'/', fillColor:'#e5edd9'},
                        { text:'', fillColor:'#ffffff'},
                        { text:'', fillColor:'#ffffff'},
                        { text:'/', fillColor:'#e5edd9'},
                        { text:'', fillColor:'#ffffff'},
                        { text:'', fillColor:'#ffffff'},
                      ],  
                      [
                        {},
                        { text:'D', fontSize:7, fillColor:'#e5edd9', alignment: 'center'}, 
                        { text:'D', fontSize:7, fillColor:'#e5edd9', alignment: 'center'},
                        {},                        
                        { text:'M', fontSize:7, fillColor:'#e5edd9', alignment: 'center'},
                        { text:'M', fontSize:7, fillColor:'#e5edd9', alignment: 'center'},
                        {},                        
                        { text:'Y', fontSize:7, fillColor:'#e5edd9', alignment: 'center'},
                        { text:'Y', fontSize:7, fillColor:'#e5edd9', alignment: 'center'},
                      ],
                    ],
                    },
                    layout:{
                      vLineWidth :  function(i, node) { return 3},
                      // paddingTop:  function(i, node) { return 4; },
                      // paddingBottom: function(i, node) { return 4; },              
                      vLineColor: function (i, node) { return '#e5edd9' },
                      hLineColor: function (i, node) { return '#e5edd9' },
                    }
                  },
                  {
                    table:{
                      widths: ['66%','4%','4%','4%','4%','4%','4%','2%','4%','4%'],
                      body: [                  
                        [
                          { text:'Debit this amount: $ ', fontSize: 7, fillColor:'#e5edd9', bold: true, },
                          { text:'', fillColor:'#ffffff'}, 
                          { text:'', fillColor:'#ffffff'}, 
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#ffffff'},
                          { text:'.', fillColor:'#e5edd9'},
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#ffffff'},
                        ],                          
                      ],
                      },
                      layout:{
                        vLineWidth :  function(i, node) { return 3},
                        // paddingTop:  function(i, node) { return 4; },
                        // paddingBottom: function(i, node) { return 4; },              
                        vLineColor: function (i, node) { return '#e5edd9' },
                        hLineColor: function (i, node) { return '#e5edd9' },
                      }
                  },
                  {},
                ],  
                [
                    
                  {},
                  {
                    table:{
                      widths: ['5%','95%'], 
                      body: [                  
                        [
                          { text:'', fillColor:'#ffffff',},
                          // { text:'', fillColor:'#e5edd9', border: [false, false, false, false]},
                          { text:'\t\t\t\tRegular Debits', fontSize: 7, fillColor:'#e5edd9', bold: true, border: [false, false, false, false]}
                        ],  
                      ],
                    },                     
                  },                  
                  { alignment:'left',
                    table:{
                    widths: ['60%','6%','6%','2%','6%','6%','2%','6%','6%'],
                    body: [                  
                      [
                        { text:'Starting On Date: ', fontSize: 7, fillColor:'#e5edd9', bold: true, },
                        { text:'', fillColor:'#ffffff'}, 
                        { text:'', fillColor:'#ffffff'},
                        { text:'/', fillColor:'#e5edd9'},
                        { text:'', fillColor:'#ffffff'},
                        { text:'', fillColor:'#ffffff'},
                        { text:'/', fillColor:'#e5edd9'},
                        { text:'', fillColor:'#ffffff'},
                        { text:'', fillColor:'#ffffff'},
                      ],  
                      [
                        {},
                        { text:'D', fontSize:7, fillColor:'#e5edd9', alignment: 'center'}, 
                        { text:'D', fontSize:7, fillColor:'#e5edd9', alignment: 'center'},
                        {},                        
                        { text:'M', fontSize:7, fillColor:'#e5edd9', alignment: 'center'},
                        { text:'M', fontSize:7, fillColor:'#e5edd9', alignment: 'center'},
                        {},                        
                        { text:'Y', fontSize:7, fillColor:'#e5edd9', alignment: 'center'},
                        { text:'Y', fontSize:7, fillColor:'#e5edd9', alignment: 'center'},
                      ],
                    ],
                    },
                    layout:{
                      vLineWidth :  function(i, node) { return 3},
                      // paddingTop:  function(i, node) { return 4; },
                      // paddingBottom: function(i, node) { return 4; },              
                      vLineColor: function (i, node) { return '#e5edd9' },
                      hLineColor: function (i, node) { return '#e5edd9' },
                    }
                  },
                  {
                    table:{
                      widths: ['66%','4%','4%','4%','4%','4%','4%','2%','4%','4%'],
                      body: [                  
                        [
                          { text:'Debit this amount: $ ', fontSize: 7, fillColor:'#e5edd9', bold: true, },
                          { text:'', fillColor:'#ffffff'}, 
                          { text:'', fillColor:'#ffffff'}, 
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#ffffff'},
                          { text:'.', fillColor:'#e5edd9'},
                          { text:'', fillColor:'#ffffff'},
                          { text:'', fillColor:'#ffffff'},
                        ],                          
                      ],
                      },
                      layout:{
                        vLineWidth :  function(i, node) { return 3},
                        // paddingTop:  function(i, node) { return 4; },
                        // paddingBottom: function(i, node) { return 4; },              
                        vLineColor: function (i, node) { return '#e5edd9' },
                        hLineColor: function (i, node) { return '#e5edd9' },
                      }
                  },
                  {},
                ], 
              ],
            },            
            layout: {
              paddingTop:  function(i, node) { return 4; },
              paddingBottom: function(i, node) { return 4; },              
              vLineWidth :  function(i, node) { return 0},
              hLineWidth :  function(i, node) { return (i===0 || i===1 ) ? 1 : 6 },

              hLineColor: function (i, node) {
                return (i === 1 ) ? '#619d5a' : '#e5edd9';
              },
              // vLineColor: function (i, node) {                
              //   return (i === 1) ? '#619d5a' : '#e5edd9';
              // },
            }, 
          },
  ],  
    pageSize: 'A4',
    pageOrientation: 'portrait',
  }
  return dd ;
}