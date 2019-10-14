import React, { useState, useEffect } from 'react';

import { logo } from '../../../common/Logo.js';
import { getDate, getCurrentDate } from '../../../../utils/datetime';
import { spacing } from '@material-ui/system';
import { isAfter } from 'date-fns';

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
    pageMargins: [ 40, 40, 40, 50 ],
    footer: function (currentPage, pageCount) {
        return {
            table: {
                widths: '*',
                body: [
                    [
                        { text: "Page " + currentPage.toString() + ' of ' + pageCount, alignment: 'right', fontSize: 8, margin: [0, 20, 50, 0], }
                    ],
                ]
            },
            layout: 'noBorders'
        };
    },
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
               { text: getCurrentDate() , style: 'Header3'},
              ],
            ]
          },
          '\n',
          
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
                [
                  { text : '',
                    pageBreak: "after",
                  },            
                ],
                [
                  {style:'margins', text: [  
                    { text: 'WHAT COULD HAPPEN IF YOU FAIL TO MEET YOUR COMMITMENTS', style: 'Header3Center', bold: true, alignment: screenLeft }, 
                  ], border: [true, false, true, false]},
                ],
                [{
                  border: [true, false, true, false],
                  table: {                    
                    widths: ['100%'],
                    body: [
                      [ 
                        {style:'margins',   border: [true, true, true, false], text: [  
                          { text: 'Security interest(s)',   fontSize:8, bold: true, alignment: screenLeft,},                          
                          { text: '\nThis is secured credit.  If you fail to meet your commitments under the contract, the creditor may be entitled to repossess and sell this property.', fontSize:8, alignment: screenLeft},
                          { text: '\nDescription of security Interest\'s):', fontSize:8, bold: true, alignment: screenLeft},
                          { text: '\nProperty which is or will be) subject to a security interest:', fontSize:8, alignment: screenLeft, },                          
                          ],                         
                        },                        
                      ],
                      [
                        {    
                          border: [true, false, true, false], 
                          table: {  
                            widths: ['50%','50%'],
                            body: [
                              [                               
                                { text: 'Item', fontSize:8, alignment: screenLeft},
                                { text: 'Description', fontSize:8, alignment: screenLeft},
                              ],
                              [                               
                                { text: '\n', fontSize:8, alignment: screenLeft},
                                { text: '\n', fontSize:8, alignment: screenLeft},
                              ],
                              [                               
                                { text: '\n', fontSize:8, alignment: screenLeft},
                                { text: '\n', fontSize:8, alignment: screenLeft},
                              ],
                              [                               
                                { text: '\n', fontSize:8, alignment: screenLeft},
                                { text: '\n', fontSize:8, alignment: screenLeft},
                              ],
                            ], 
                          },
                        }
                      ],
                      [ 
                        { text: 'You must not create or allow any Security Interest over the Goods, If a Security Interest is created over the Goods in breach of this Agreement, we may repossess the Goods. We may also pay the holder of the Security Interest the amount necessary to discharge it and we may recover any costs from you.',   fontSize:8, bold: true, alignment: screenLeft, border: [true, false, true, true],}, 
                      ],                                                                                   
                    ], 
                  },
                }],               
                [{
                  border: [true, false, true, false],
                  table: {                    
                    widths: ['100%'],
                    body: [
                      [
                        {style:'margins', text: [  
                          { text: 'Penalty Interest -',   fontSize:8, alignment: screenLeft, bold: true},                          
                          { text: '\nIn the event of a default in payment, and while the default continues, you must pay the penalty interest charges. ', fontSize:8, alignment: screenLeft},
                          { text: '\nPenalty Interest is charged from the time you fail to make a due payment until the arrears are paid. Penalty interest is calculated by multiplying the amount in arrears at the end of the day by a daily penalty interest rate. The daily penalty interest rate is calculated by dividing the annual penalty interest rate by 365. Interest is charged to your account weekly.', fontSize:8, alignment: screenLeft},
                          { text: '\nAnnual Penalty Interest rate is: 10%', fontSize:8, alignment: screenLeft},
                          
                          { text: '\n\nDefault Fees -',   fontSize:8, alignment: screenLeft, bold: true},                          
                          { text: '\nIn the event of a breach of the contract or on the enforcement of the contract, the default fees specified below are payable. Your credit contract may allow the creditor to vary these fees and charges.',   fontSize:8, alignment: screenLeft,},
                          { text: '\nLate Fee: $10.00 is charged when a payment is not made when it becomes due.',   fontSize:8, alignment: screenLeft,},
                          { text: 'Repossession Fee: will be the reasonable fees incurred by us when a repossession attempt is made.',   fontSize:8, alignment: screenLeft,},
                          ],
                        },                         
                      ],                                                           
                    ], 
                  },
                }],

                [
                  {style:'margins', text: [  
                    { text: 'TERMINATION', style: 'Header3Center', bold: true, alignment: screenLeft }, 
                  ], border: [true, false, true, false]},
                ],

                [{
                  border: [true, false, true, false],
                  table: {                    
                    widths: ['100%'],
                    body: [
                      [
                        {style:'margins', text: [  
                          { text: 'EARLY TERMINATION',   fontSize:8, alignment: screenLeft, bold: true},                          
                          { text: '\nIf you seek to terminate the contract before the Minimum Term, you may be required to pay a fee or charge to compensate the creditor for any loss resulting from the early termination.', fontSize:8, alignment: screenLeft},
                          { text: '\nEarly Termination Fee: will be 2 fortnightly payment instalments or 4 weekly payment instalments,', fontSize:8, alignment: screenLeft},
                          
                          { text: '\n\nTERMINATION',   fontSize:8, alignment: screenLeft, bold: true},                          
                          { text: '\nIf you seek to terminate the contract after the Minimum Term, you must provide the creditor with one payment period notice. At this stage, we will arrange a time to Collect the Goods from you, or you can return them to our store.',   fontSize:8, alignment: screenLeft,},
                          ],
                        },                         
                      ],                                                           
                    ], 
                  },
                }],

                [
                  {style:'margins', text: [  
                    { text: 'RIGHT TO CANCEL', style: 'Header3Center', bold: true, alignment: screenLeft }, 
                  ], border: [true, false, true, false]},
                ],

                [{
                  border: [true, false, true, false],
                  table: {                    
                    widths: ['100%'],
                    body: [
                      [
                        {style:'margins', text: [  
                          { text: 'You are entitled to cancel the consumer credit contract by giving notice to the creditor.',   fontSize:8, alignment: screenLeft,},                          
                          { text: '\nTime limits for cancellation',   fontSize:8, alignment: screenLeft, bold: true},                                                    
                          { text: '\nIf the disclosure documents are handed to you directly you must give notice that you intend to cancel within 5 working days after you receive the documents.', fontSize:8, alignment: screenLeft},
                          { text: '\nIf the disclosure documents are sent to you by electronic means (email) you must give notice within 7 working days after the electronic communication is sent.', fontSize:8, alignment: screenLeft},
                          { text: '\nIf the documents are mailed to you in the post you must give notice within 9 working days after they were posted. Saturdays, Sundays, and national public holidays are not counted as working days.', fontSize:8, alignment: screenLeft},
                          
                          { text: '\n\nHow to cancel',   fontSize:8, alignment: screenLeft, bold: true},
                          { text: '\nTo cancel, you must give the creditor written notice that you intend to cancel the contract by:',   fontSize:8, alignment: screenLeft,},
                          {style:'margins', text: [  
                            { text: '\n*  giving notice to the creditor or an employee or agent of the creditor; or',   fontSize:8, alignment: screenLeft,},
                            { text: '\n*  posting the notice to the creditor or an agent of the creditor; or',   fontSize:8, alignment: screenLeft,},
                            { text: '\n*  emailing the notice to the creditor\'s email address (if specified on the front of this disclosure statement); or',   fontSize:8, alignment: screenLeft,},
                            { text: '\n*  sending the notice to the creditor\'s fax number (if specified on the front of this disclosure statement).',   fontSize:8, alignment: screenLeft,},
                          ]},
                          { text: '\nYou must also:',   fontSize:8, alignment: screenLeft, bold: true},
                          {style:'margins', text: [  
                            { text: '\na)   return to the creditor any advance and any other property received by you under the contract (but you cannot do this if youhave taken possession of any goods or if you have bought any property at an auction or if the contract is for the sale of services that have been performed); or',   fontSize:8, alignment: screenLeft,},
                            { text: '\nb)   pay the cash price of the property or services within 15 working days of the day you give notice.',   fontSize:8, alignment: screenLeft,},
                          ]},
                          { text: '\n\nWhat you may have to pay if you cancel',   fontSize:8, alignment: screenLeft, bold: true},
                          { text: '\nIf you cancel the contract, the creditor can charge you:',   fontSize:8, alignment: screenLeft,},
                          {style:'margins', text: [  
                            { text: '\na)   the amount of any reasonable expenses the creditor had to pay in connection with the contract and its cancellation (including legal fees and fees for credit reports, etc);',   fontSize:8, alignment: screenLeft,},
                            { text: '\nb)   the costs of repairing any property you return if the property was damaged while it was in your possession.',   fontSize:8, alignment: screenLeft,},
                          ]},
                          ], lineHeight: 1.2,
                        },                         
                      ],                                                           
                    ], 
                  },
                }],

        ],              
      },
    },  
   
          
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