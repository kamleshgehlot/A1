import React, { useState, useEffect } from 'react';

import { logo } from '../../../common/Logo.js';
import { getDate, getCurrentDate } from '../../../../utils/datetime';
import { spacing } from '@material-ui/system';

function buildTableBody(data, columns, valueKeys, orderType) {
  var body = [];

  body.push([
    { text: 'PRODUCT AND CREDIT DETAILS: ', style: 'margins', bold: true, alignment: screenLeft, fontSize: 10, colSpan: 3}, {},{}
  ]);

  var dataRow1 = [];

  dataRow1.push(
    { text: columns[0], style: 'margins', bold: true, alignment: screenLeft, fontSize: 8 }
  );
  dataRow1.push(    
    { text: columns[1], style: 'margins', bold: true, alignment: screenLeft, fontSize: 8 }
  );
  dataRow1.push(
    { text: columns[2], style: 'margins', bold: true, alignment: screenLeft, fontSize: 8 }                   
  );

  body.push(dataRow1);

  data.forEach(function(row) {
    var dataRow = [];

    valueKeys.forEach(function(column) {
      if(column === 'paymentType') {
        dataRow.push({ text: orderType[0].frequency == 1 ? 'WEEKLY PAYMENT' :  'FORTNIGHTLY PAYMENT', style: 'margins', bold: true, alignment: screenLeft, fontSize: 8,  },);

      } else {
        dataRow.push({ text: row[column.toLowerCase()], style: 'margins', bold: true, alignment: screenLeft, fontSize: 8,  },);
      }
    })

    body.push(dataRow);
  });

  return body;
}




export default function layout(data,order) {

  const franchise = data.franchise;
  const products = data.product;
  const customer = data.customer;
  const orderType = data.flexOrder;
  const budget = data.budget; 
  const user = data.user; 


  var dd = {
    content: 
      [
          { 
            columns: [                 
                { image: logo, fit: [150, 150], style: 'Header1'},                                
              [ { text: 'DISCLOSURE STATEMENT FOR CONSUMER LEASE', style: 'Header2', bold: true },
                { text: 'RENT-FLEX CONTRACT', style: 'Header2', bold: true },
              ],
              [ 
               { text: '\nStatement Date ' , style: 'Header3'},               
              //  { canvas: [{ type: 'line', x1: 10, y1: 10, x2: 595-10, y2: 10, lineWidth: 0.5 }] },
               { text: getCurrentDate() , style: 'Header3'},
              ],
            ]
          },
          '\n',
          // { text: 'Inial disclosure statement under section 64 of Credit Contracts and Consumer Finance Act 2003 for consumer lease contracts.', style: 'Header3Center', bold: true, alignment: screenLeft }, 
                            // { text: 'IMPORTANT -', style: 'Header3Center', bold: true, alignment: screenLeft }, 
          {
            table: {              
              widths: ['*'],
              body: [                
                  [
                    {                    
                     border: [true, true, true, false],
                      table: {
                        widths: ['*'],
                        body: [
                          [
                            {style:'margins', text: [  
                              { text: 'Inial disclosure statement under section 64 of Credit Contracts and Consumer Finance Act 2003 for consumer lease contracts.', style: 'Header3Center', bold: true, alignment: screenLeft }, 
                              { text: '\nIMPORTANT -', style: 'Header3Center', bold: true, alignment: screenLeft }, 
                              { text: 'This document sets out key information about your consumer lease contract. You should read it thoroughly.'
                                    + 'if you do not understand anything in this document, you should seek independent advice. you should keep this disclosure statement'
                                    + 'and a copy of your consumer credit contract in a safe place.', style: 'Header3Center', alignment: screenLeft }, 
                              { text: '\nThe law gives you a limited right to cancel the consumer lease contract (see below for further details). Note That strict time limits apply.', style: 'Header3Center', alignment: screenLeft }, 
                            ]},
                          ]
                        ]
                      },                      
                  }],
                  [
                    {style:'margins', text: [  
                      { text: '\nFULL NAME AND ADDRESS OF CREDITOR ', style: 'Header3Center', bold: true, alignment: screenLeft }, 
                      { text: '(this is the person providing you the credit)', style: 'Header3Center', alignment: screenLeft }, 
                    ], border: [true, false, true, false]},
                  ],

                  [{
                    border: [true, false, true, false],
                    table: {
                      widths: ['40%','60%'],
                      body: [                        
                        [
                          {style:'margins', text: [
                            { text: 'You may send notices to the creditor by:\n', style: 'Header3Center',  bold: true,  alignment: screenLeft },
                            { ul: [
                                { text: '\t*\tWriting to the creditor at the creditor\'s portal address; or \n', style: 'Header3Center',  bold: true,  alignment: screenLeft }, 
                                { text: '\t*\tSending an email to the address specified', style: 'Header3Center',  bold: true,  alignment: screenLeft },
                              ]
                            },
                          ], fillColor: '#C5C7C0',
                        },
                          {style:'margins', text: [
                            { text: 'Name:\t\t\t\t',   alignment: screenLeft, fontSize: 10},   
                            { text: '\nAddress:\t\t\t', alignment: screenLeft,  fontSize: 10 }, 
                            { text: '\nPhone:\t\t\t', alignment: screenLeft, fontSize: 10 }, 
                            { text: '\nEmail:\t', alignment: screenLeft, fontSize: 10 }, 
                          ], fillColor: '#C5C7C0',
                        },
                        ],
                      ], 
                    },
                }],

                [
                  {style:'margins', text: [  
                    { text: 'CONSUMER LEASE DETAILS', style: 'Header3Center', bold: true, alignment: screenLeft }, 
                  ], border: [true, false, true, false]},
                ],
                [{
                  border: [true, false, true, false],
                  // layout: 'noBorders',
                  table: {                    
                    widths: ['30%','30%','40%'],
                    body: [                                             
                      [
                        { text: '\nRent Price of Goods', style: 'Header3Center',  alignment: screenLeft },
                        { text: '\n$_________________________________', style: 'Header3Center',  alignment: screenLeft },
                        {style:'margins', rowSpan:5, 
                          text: [  
                            { text: '\nThis consumer lease has a Minimum Term of Six(6) Months.\n', bold:true, style: 'Header3Center',  alignment: screenLeft },
                            { text: 'If you terminate the lease before six months you will be liable To pay an Early Termination Fee\n\n\n', style: 'Header3Center',  alignment: screenLeft },
                            { text: 'Option to purchase\n', style: 'Header3Center', bold:true,  alignment: screenLeft },
                            { text: 'Under this Rent-Flex Contract there is no option to purchase the Good.', style: 'Header3Center', italics: true, alignment: screenLeft },
                          ], 
                        },                        
                      ],
                      [
                        { text: '\nPPSR Fee (if applicable)', style: 'Header3Center',  alignment: screenLeft },
                        { text: '\n$_________________________________', style: 'Header3Center',  alignment: screenLeft },{}
                      ],
                      [
                        { text: '\nLiability Waiver Fee*', style: 'Header3Center',  alignment: screenLeft },
                        { text: '\n$_________________________________', style: 'Header3Center',  alignment: screenLeft },{}
                        // { text: 'Rent Price of Goods', style: 'Header3Center',  alignment: screenLeft },
                      ],
                      [
                        { text: '*$1.5 per week or $3.00 per fornight', alignment: screenLeft, fontSize:8 },
                        { text: '', style: 'Header3Center',  alignment: screenLeft },{}
                      ],
                      [
                        {style:'margins', text: [
                          { text: 'TOTAL ', style: 'Header3Center',  bold:true, alignment: screenLeft },
                          { text: 'PER WEEK / FORNIGHT', style: 'Header3Center',  alignment: screenLeft },
                          { text: '\nPlease circle which is applicable', fontSize: 7,  alignment: screenLeft },
                          ],
                        },                        
                        { text: '\n$_________________________________', style: 'Header3Center',  alignment: screenLeft },{}
                      ],                     
                    ], 
                  },
                }],

                [
                  {style:'margins', text: [  
                    { text: 'PAYMENTS', style: 'Header3Center', bold: true, alignment: screenLeft }, 
                    { text: '\t\t\t\tYou are required to make each payment of the amount specified and by the time specified', fontSize: 7, bold: true, alignment: screenLeft },
                  ], border: [true, false, true, false]},
                ],

                [{
                  border: [true, false, true, false],
                  table: {                    
                    widths: ['40%','5%','15%','5%','15%','5%','15%'],
                    body: [
                      [
                        { text: 'Timing of Payments', style: 'paymentHeading', border: [true, true, false, false],},
                        { text: '', border: [true, false, true, false],},
                        { text: 'Number of Payments', style: 'paymentHeading', border: [true, true, false, false],},
                        { text: '', border: [true, false, true, false],},
                        { text: 'Amount of Each Payment', style: 'paymentHeading', border: [true, true, false, false], },
                        { text: '', border: [true, false, true, false],},
                        { text: 'Total Amount of payments', style: 'paymentHeading', border: [true, true, false, true],},                                               
                      ],  
                      [
                        {style:'margins', text: [  
                          { text: '\nFrequency \t\t\t_______________________', alignment: screenLeft, fontSize: 8, },
                          { text: '\n\nFirst payment \t\t_______________________\n\n',  alignment: screenLeft, fontSize: 8,},
                        ],border: [true, false, true, true],},
                          { text: '', border: [true, false, true, false],},
                          { text: '\n\nINDEFINITE\n', style: 'paymentBody', border: [true, false, true, true],},
                          { text: '', border: [true, false, true, false],},
                          { text: '\n\n$___________\n',  style: 'paymentBody', border: [true, false, true, true], },
                          { text: '', border: [true, false, true, false],},
                          { text: '\n\nINDEFINITE\n', style: 'paymentBody', border: [true, false, true, true],},
                      ],                                    
                    ], 
                  },
                }],


                [{
                  border: [true, false, true, false],
                  table: {                    
                    widths: ['50%','2%','23%','2%','23%'],
                    body: [
                      [
                        {style:'margins', text: [  
                          { text: 'Minimum number of Payments before Delivery',   fontSize:8, alignment: screenLeft, bold: true,},
                          { text: '\n\n\n_____________________________', style: 'paymentHeading',},
                          { text: '\n\nWe require the Bond to be paid by you on/before the Delivery Date to source' 
                                + 'performance of your obligations under the contract, or the payment of money payable under ' 
                                + 'the contract, or both.', fontSize:8, alignment: screenLeft},
                          ],
                        },
                        {},
                        {style:'margins', text: [  
                          { text: 'Expected Delivery Date',   style: 'paymentHeading'},
                          { text: '\n\n____________________', style: 'paymentHeading',},
                          { text: '\n\nExpected Time of Delivery', style: 'paymentHeading'},
                          { text: '\n\n_______________AM/PM', style: 'paymentHeading'},
                          ],
                        },                        
                        {},
                        {style:'margins', text: [  
                          { text: 'Bond Amt.',  style: 'paymentHeading'},
                          { text: '\n\n\n$_____________________', style: 'paymentHeading',},
                          ],
                        },   
                      ],                                                           
                    ], 
                  },
                }],

                [
                  {style:'margins', text: [  
                    { text: 'CREDIT FEE AND CHARGES', style: 'Header3Center', bold: true, alignment: screenLeft }, 
                  ], border: [true, false, true, false]},
                ],

                [{
                  border: [true, false, true, false],
                  table: {                    
                    widths: ['100%'],
                    body: [
                      [
                        {style:'margins', text: [  
                          { text: 'The following credit fee(s) and charge(s) (which are not included in the initial unpaidbalance) are, or may become, payable under, or in connection with, the contract Your consumer lease may allow the creditor to vary this/these fee(s) and charge(s).',   fontSize:8, alignment: screenLeft,},                          
                          { text: '\nEarly Termination Fee:   $_________________, being 2 fortnightly payment instalments or 4 weekly payment instalments.', fontSize:8, alignment: screenLeft},
                          { text: '\nLiability Waiver Excess: $_________________, being 2 fortnightly payment instalments or 4 weekly payment instalments.', fontSize:8, alignment: screenLeft},
                          { text: '\nAdministration costs and fees payable on full prepayment are disclosed under the full prepayment heading.', fontSize:8, alignment: screenLeft},
                          ], lineHeight: 1.5,
                        },                         
                      ],                                                           
                    ], 
                  },
                }],

                [
                  {style:'margins', text: [  
                    { text: 'CONTINUING DISCLOSURE', style: 'Header3Center', bold: true, alignment: screenLeft }, 
                  ], border: [true, false, true, false]},
                ],

                [{
                  border: [true, false, true, false],
                  table: {                    
                    widths: ['100%'],
                    body: [
                      [
                        {style:'margins', text: [  
                          { text: 'The creditor may be required to provide you with regular statements.  The statements will give you information about your account.',   fontSize:8, alignment: screenLeft,},                          
                          { text: '\nStatements will be provided every six (6) months', fontSize:8, alignment: screenLeft},
                          ], lineHeight: 1.5,
                        },                         
                      ],                                                           
                    ], 
                  },
                }],
              
                [
                  {style:'margins', text: [  
                    { text: 'LIABILITY WAIVER', style: 'Header3Center', bold: true, alignment: screenLeft }, 
                  ], border: [true, false, true, false]},
                ],

                [{
                  border: [true, false, true, false],
                  table: {                    
                    widths: ['100%'],
                    body: [
                      [
                        {style:'margins', text: [  
                          { text: 'If you have elected to purchase the liability waiver you must pay:',   fontSize:8, alignment: screenLeft,},                          
                          { text: '\n$ 1.50 weekly 	', fontSize:8, alignment: screenLeft},
                          { text: 'OR', fontSize:8, alignment: screenLeft, bold: true},
                          { text: ' 	$3.00 fortnightly (circle which is applicable) per item', fontSize:8, alignment: screenLeft},
                          { text: '\nIn the event you need to use the liability waiver the excess charge is $___________________  being 2 fortnightly or 4 weekly payment instalments.', fontSize:8, alignment: screenLeft},
                          ], lineHeight: 1.5,
                        },                         
                      ],                                                           
                    ], 
                  },
                }],

            [{
              border: [true, false, true, true],
              table: {
                widths: ['*','*','*'],
                // margin: [100,20,10,40],
                // fillColor: 'gray',
                // background: 'gray',
                body:buildTableBody(products, ['Product', 'Description', 'Payment Type'], ['name', 'description', 'paymentType'], orderType),
                  // productList,
                   // products.map(data =>{
                    // console.log(data)
                    // products.map((data, index) =>{
                    //   return(
                    //     [
                    //       { text: 'Product', style: 'margins', bold: true, alignment: screenLeft, fontSize: 8 },
                    //       { text: 'Description', style: 'margins', bold: true, alignment: screenLeft, fontSize: 8 },
                    //       { text: 'Payment Type', style: 'margins', bold: true, alignment: screenLeft, fontSize: 8 },                    
                    //     ]
                    //   )
                    // })
                    
                  // products.map((data) => {
                  // // var dataRow = [];
                  // // dataRow.push('[');
                  // return(
                  // [
                  //   { text: data.name, style: 'margins', bold: true, alignment: screenLeft, fontSize: 8, },
                  //   { text: data.description, style: 'margins', bold: true, alignment: screenLeft, fontSize: 8,  },
                  //   { text: (orderType[0].frequency == 1 ? 'WEEKLY PAYMENT' :  'FORTNIGHTLY PAYMENT'), style: 'margins', bold: true, alignment: screenLeft, fontSize: 8,  },
                  // ]
                  // )
                  // dataRow.push(']');
                  // productList.push(dataRow)
                // })                 
                //]
              },
          }],             
        ],              
      },
    },
    '\n',
    {
      table: {
              widths: ['*'],              
              body: [
                [
                  { text: 'PAYMENT PLAN DETAILS: ', bold: true, alignment: screenLeft, fontSize: 10 , fillColor: '#C5C7C0' }, 
                ],
                [
                {style:'margins', text: [  
                  { text: 'New Customer :' + (order.customer_type===1 ? 'Yes' : order.customer_type===2 ? 'No' : ''), style: 'Header1Center', alignment: screenLeft,  bold: true, }, 
                  { text: '\nExisting Customer :' + (order.customer_type===2 ? 'Yes' : order.customer_type===1 ? 'No' : ''), style: 'Header1Center', alignment: screenLeft,  bold: true, }, 
                ]}
                ],
              ]
            },
    },
    '\n',
    {
      
      table: {
              widths: ['*','*','*'],
              body: [
                [
                  { text: 'PAYMENT METHOD & FREQUENCY: ', bold: true, alignment: screenLeft, fontSize: 10 , fillColor: '#C5C7C0', colSpan: 3},{},{}
                ],
                [
                  { text: 'DAY YOU GET PAID [         ]',  bold: true, alignment: screenLeft, fontSize: 8 }, 
                  { text: 'DAY PAYMENT DEBITED [         ]',  bold: true, alignment: screenLeft, fontSize: 8 }, 
                  { text: 'PAYMENT START DATE      /  /   ',  bold: true, alignment: screenLeft, fontSize: 8 }, 
                ],
                [
                  { text: 'FREQUENCY OF PAYMENT',  bold: true, alignment: screenLeft, fontSize:8, fillColor: '#C5C7C0'  },                   
                  { text: '$' +  orderType[0].each_payment_amt +'  '+ (orderType[0].frequency == 1 ? 'PAID WEEKLY' :  'PAID FORTNIGHTLY'),   bold: true, alignment: screenLeft, fontSize:8, colSpan: 2 }, {}
                  // { text: '$             PAID FORTNIGHTLY',  bold: true, alignment: screenLeft, fontSize:8 }, 
                ],
              ]
            },
    },
    '\n',
    {
      
      table: {
              widths: ['*'],
              body: [
                [
                  { text: 'DELIVERY DETAILS: ', bold: true, alignment: screenLeft, fontSize: 10 , fillColor: '#C5C7C0'}
                ],  
                [
                  {style:'margins', text: [  
                    { text: 'NUMBER OF PAYMENTS:  ' + orderType[0].no_of_payment , alignment: screenLeft,  bold: true, fontSize:8}, 
                    { text: '\t\t\t\t\t\t\t\tBOND AMOUNT: $' + orderType[0].bond_amt , alignment: screenLeft,  bold: true, fontSize:8}, 
                    { text: '\t\t\t\t\t\t\t\tEXPECTED DELIVERY DATE:  ' +  orderType[0].exp_delivery_date, alignment: screenLeft,  bold: true, fontSize:8}, 
                  ]}
                ],
              ]
            },
    },
    '\n',
    {
      table: {
              widths: ['*'],
              body: [
                [
                  { text: 'DECLARATION: ', bold: true, alignment: screenLeft, fontSize: 10 , fillColor: '#C5C7C0'}
                ],  
                [
                  {style:'margins', text: [  
                    { text: 'I ', alignment: screenLeft,  bold: true, fontSize:8}, 
                    { text: customer[0].customer_name , alignment: screenLeft,  bold: true, fontSize:9}, 
                    { text: ' AGREE TO RENT THE GOOD(S) ABOVE ON THE TERMS AND CONDITIONS IN THIS RENT-FLEX CONTRACT AND IN THE GENERAL TERMS AND CONDITIONS AND CONFIRM TO THE BEST OF MY KNOWLEDGE THAT ALL THE ABOVE INFORMATION IS TRUE AND CORRECT.', alignment: screenLeft,  bold: true, fontSize:8},                    
                    { text: '\n\n\nSIGNED_______________________________________________________________', alignment: screenLeft,  bold: true, fontSize:8},
                    { text: '\t\t\t\t\t\t\t\t\tDATE:  ' + new Date().getDate() + '/' + (new Date().getMonth() + 1) + '/' + (new Date().getFullYear()), alignment: screenLeft,  bold: true, fontSize:8},
                  ]}
                ],
              ]
            },
    },
    '\n',
    {
      table: {
              widths: ['*'],
              body: [
                [
                  { text: 'NOTICE TO CUSTOMER: RIGHT OF CANCELLATION:', bold: true, alignment: screenLeft, fontSize: 10 , fillColor: '#C5C7C0'}
                ],  
                [
                  {style:'margins', text: [  
                    { text: 'Summary of your right to cancel under section 36F(1) of the Fair Trading Act 1986',italics: true, alignment: screenLeft,  bold: true, fontSize:8},                    
                    { text: '\nThe Fair Trading Act 1986 (“the Act”) gives you a right to cancel this Rent-Flex Contract:', alignment: screenLeft,  fontSize:8},                    
                    { text: '\n(a)\t\tAt any time before you take possession of the Goods; and', alignment: screenLeft,   fontSize:8},
                    { text: '\n(b)\t\tIn any way (including oral or written) that shows your intention to cancel or withdraw from this Rent-Flex Contract.', alignment: screenLeft,   fontSize:8},

                    { text: '\n\nSummary of your right to cancel under Section 36M(1) of the Fair Trading Act 1986',italics: true, alignment: screenLeft, bold: true,  fontSize:8},
                    { text: '\n(a)\t\tWithin 5 working days after the date you receive a copy of this Rent-Flex Contract; or', alignment: screenLeft,   fontSize:8},
                    { text: '\n(b)\t\tIf we fail to make disclosure under section 36L of the Act, at any time.', alignment: screenLeft,   fontSize:8},
                    { text: '\nThis statement only contains a summary of your rights and obligations in connection with your right to cancel. If there is anything about your rights or obligations under the Fair Trading Act 1986 that you do not understand, if there is a dispute about your rights, or if you think that we are being unreasonable in any way, you should seek legal advice immediately.', alignment: screenLeft,   fontSize:8},
                  ]}
                ],
              ]
            },
    }

  ],
    styles: {
      // Header
      Header1: {
        // fontSize: 8,
        alignment: 'left',
      },
      Header2: {
        fontSize: 11,
        alignment: 'center',
      },
      Header3: {
        fontSize: 9,
        alignment: 'center',
      },

      Header1Left: {
        fontSize: 8,
        alignment: 'center',
      },
      Header2Center: {
        fontSize: 13,
        alignment: 'center',
      },
      Header3Center: {
        fontSize: 8,
        alignment: 'center',
      },

      paymentHeading: {
        fontSize: 8,
        alignment: 'center',
        bold: true,       
      },
      paymentBody: {
        fontSize: 10,
        alignment: 'center',
        bold: true,         
      },

      removeTopBottomBorder: {
        border: [true, false, true, false],
      },

      custoemr: {
        // fontSize: 10,
        alignment: 'right',
      },
      margins:{
        margin: [10,0,0,0]
      },
      // Customer: {
      //   fontSize: 10,
      //   alignment: 'left',
      //   margin: [40, 5]
      // },
      ItemHeader: {
        fontSize: 10,
        bold: true
      },
      Common: {
        fontSize: 10,
      }
    },
    pageSize: 'A4',
    pageOrientation: 'portrait',
  }
  return dd ;
}