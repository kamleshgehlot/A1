import { logo } from '../../../common/Logo.js';
import { getDate, getCurrentDate, getDateInDDMMYYYY, getCurrentDateDDMMYYYY } from '../../../../utils/datetime';
import { styles } from './Styles.js';

function budgetComment(comments){
  var body =[];

  body.push([
    { text: 'ADDITIONAL COMMENTS', style: styles.Header1Center, bold: true, alignment: screenLeft, fillColor:  '#C5C7C0'  }, 
  ]);

  comments.forEach(function(comment){
    body.push([
      { text: comment.comment, style: styles.margins, bold: true, alignment: screenLeft,  fontSize:8 }, 
    ])
  })
  return body;
}


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
               { text: [{ text: '\n' + franchise[0].location + '\n', style: styles.Header1Center },{ text: '[PH] ', style: styles.Header1Center, bold: true },{ text: franchise[0].contact + '\n', style: styles.Header1Center },{ text: 'Email: ', style: styles.Header1Center, bold: true },{ text: franchise[0].email + '\n', style: styles.Header1Center } ]}, 
               [ { image: logo, fit: [150, 150], style: styles.Header2Center},
                 {text: '\nBUDGET ASSISTANT', style: styles.Header2Center, bold: true }, 
               ],
               { text: '\n\n\n\n\n___________________________', style: styles.Header3Center},
            ]
          },
          '\n',
          {
            table: {
              widths: ['*'],
              body: [
                  [{
                     border: [true, true, true, false],
                      table: {
                        widths: ['*','*','*','*'],
                        // heights: 40,                           
                        body: [
                          [
                            { style: styles.margins, text: [
                              { text: 'WEEKLY INCOME', style: styles.Header1Center,  bold: true,  alignment: screenLeft }, 
                              { text: '(after tax)', style: styles.Header1Center,  alignment: screenLeft }, 
                              { text: '\n(A)', style: styles.Header1Center,  alignment: screenLeft }, 
                            ]},
                            { text: '$', style: styles.Header1Center,  bold: true,  alignment: screenLeft }, 
                            { style: styles.margins, text: [
                              { text: 'WEEKLY EXPENDITURE', style: styles.Header1Center,  bold: true,  alignment: screenLeft },                               
                              { text: '\n(B)', style: styles.Header1Center,  alignment: screenLeft }, 
                            ]},
                            { text: '$', style: styles.Header1Center,  bold: true,  alignment: screenLeft }, 
                          ],
                          [
                            { text: 'Work', style: styles.Header1Center, alignment: screenLeft }, 
                            { text: budget.work, style: styles.Header1Center, alignment: screenLeft }, 
                            { text: 'Rent / Mortgage', style: styles.Header1Center, alignment: screenLeft }, 
                            { text: budget.rent, style: styles.Header1Center, alignment: screenLeft }, 
                          ],
                          [
                            { text: 'Benefits(s)', style: styles.Header1Center, alignment: screenLeft }, 
                            { text: budget.benefits, style: styles.Header1Center, alignment: screenLeft }, 
                            { text: 'Power', style: styles.Header1Center, alignment: screenLeft }, 
                            { text: budget.power, style: styles.Header1Center, alignment: screenLeft }, 
                          ],
                          [
                            { text: 'Accomodation Allowance', style: styles.Header1Center, alignment: screenLeft }, 
                            { text: budget.accomodation, style: styles.Header1Center, alignment: screenLeft }, 
                            { text: 'Landline Phone', style: styles.Header1Center, alignment: screenLeft }, 
                            { text: budget.telephone, style: styles.Header1Center, alignment: screenLeft }, 
                          ],
                          [
                            { text: 'Childcare', style: styles.Header1Center, alignment: screenLeft }, 
                            { text: budget.childcare, style: styles.Header1Center, alignment: screenLeft }, 
                            { text: 'Mobile Phone', style: styles.Header1Center, alignment: screenLeft }, 
                            { text: budget.mobile, style: styles.Header1Center, alignment: screenLeft }, 
                          ],
                          [
                            {},
                            {},
                            { text: 'Vehicle Finance', style: styles.Header1Center, alignment: screenLeft }, 
                            { text: budget.vehicle, style: styles.Header1Center, alignment: screenLeft }, 
                          ],
                          [
                            {},
                            {},
                            { text: 'Vehicle Fuel', style: styles.Header1Center, alignment: screenLeft }, 
                            { text: budget.vehicle_fuel, style: styles.Header1Center, alignment: screenLeft }, 
                          ],
                          [
                            {},
                            {},
                            { text: 'Public Transport', style: styles.Header1Center, alignment: screenLeft }, 
                            { text: budget.transport, style: styles.Header1Center, alignment: screenLeft }, 
                          ],
                          [
                            {},
                            {},
                            { text: 'Food', style: styles.Header1Center, alignment: screenLeft }, 
                            { text: budget.food, style: styles.Header1Center, alignment: screenLeft }, 
                          ],
                          [
                            {},
                            {},
                            { text: 'Credit / Store Card(s)', style: styles.Header1Center, alignment: screenLeft }, 
                            { text: budget.credit_card, style: styles.Header1Center, alignment: screenLeft }, 
                          ],
                          [
                            {},
                            {},
                            { text: 'Loans / Hire Purchase', style: styles.Header1Center, alignment: screenLeft }, 
                            { text: budget.loan, style: styles.Header1Center, alignment: screenLeft }, 
                          ],
                          [
                            {},
                            {},
                            { text: 'Other', style: styles.Header1Center, alignment: screenLeft }, 
                            { text: budget.other_expenditure, style: styles.Header1Center, alignment: screenLeft }, 
                          ],
                          [
                            { text: 'TOTAL INCOME=', style: styles.alignRight, bold: true, fillColor: '#C5C7C0'}, 
                            { text: budget.income, style: styles.alignRight , bold: true }, 
                            { text: 'TOTAL EXPENDITURE=', style: styles.alignRight, bold: true, fillColor: '#C5C7C0' }, 
                            { text: budget.expenditure, style: styles.alignRight, bold: true },   
                          ],
                          [
                            { text: 'TOTAL SURPLUS / DEFICIT (A-B)', style: styles.alignRight,  colSpan: 3, fillColor: '#C5C7C0', bold: true }, {}, {},
                            { text: budget.surplus, style: styles.alignRight, bold: true },                             
                          ],
                        ]
                      },    
                      layout: {                     
                        paddingTop:  function(i, node) { return 5; },
                        paddingBottom: function(i, node) { return 5; }, 
                      },                  
                  }],
                  [{
                    border: [true, false, true, false],
                    table: {
                      widths: ['*','25%'],                     
                      body: [
                        [
                          { text: 'How much can you afford to pay on a weekly basis?', style: styles.Header1Center, italics: true, bold: true, alignment: screenLeft, fillColor: '#C5C7C0' }, 
                          { text: budget.afford_amt, style: styles.Header1Center, bold: true, alignment: screenLeft }, 
                        ],                        
                      ]
                    },
                    layout: {                     
                      paddingTop:  function(i, node) { return 5; },
                      paddingBottom: function(i, node) { return 5; }, 
                    },  
                  }],
                  [{
                    border: [true, false, true, false],
                    table: {
                      widths: ['30%','*'],                     
                      body: [
                        [
                          { text: 'Income Details', style: styles.Header1Center, colSpan : 2, bold: true, alignment: screenLeft, }, {},
                        ],
                        [
                          { text: 'Employer', style: styles.Header1Center, alignment: screenLeft, }, 
                          { text: customer.employer_name, style: styles.Header1Center, alignment: screenLeft }, 
                        ],
                        [
                          { text: 'Address', style: styles.Header1Center, alignment: screenLeft, }, 
                          { text: customer.employer_address, style: styles.Header1Center, alignment: screenLeft }, 
                        ],
                        [
                          { text: 'Contact Telephone Number', style: styles.Header1Center, alignment: screenLeft, }, 
                          { text: customer.employer_telephone, style: styles.Header1Center, alignment: screenLeft }, 
                        ],
                        [
                          { text: 'Email', style: styles.Header1Center, alignment: screenLeft, }, 
                          { text: customer.employer_email, style: styles.Header1Center, alignment: screenLeft }, 
                        ],
                        [
                          { text: 'Length of time with Current Employer', style: styles.Header1Center, alignment: screenLeft, }, 
                          { text: customer.employer_tenure + ' year', style: styles.Header1Center, alignment: screenLeft }, 
                        ],
                      ]
                    },
                    layout: {                     
                      paddingTop:  function(i, node) { return 5; },
                      paddingBottom: function(i, node) { return 5; }, 
                    },  
                  }],
                  [{
                    border: [true, false, true, false],
                    table: {
                      widths: ['45%','*','*','*','*','*','*'], 
                      body: [
                        [
                          { text: 'Why would you be renting/buying these Product(s)?', style: styles.Header1Center, italics: true, bold: true, alignment: screenLeft, fillColor: '#C5C7C0' }, 
                          { text: 'Personal Use', style: styles.Header1Center, bold: true, alignment: screenLeft, fillColor: order.renting_for ===  1 ? '#C5C7C0' : '' }, 
                          { text: 'Liesure', style: styles.Header1Center, bold: true, alignment: screenLeft, fillColor: order.renting_for ===  2 ? '#C5C7C0' : ''  }, 
                          { text: 'Family', style: styles.Header1Center, bold: true, alignment: screenLeft, fillColor: order.renting_for ===  3 ? '#C5C7C0' : ''  }, 
                          { text: 'Gift', style: styles.Header1Center, bold: true, alignment: screenLeft, fillColor: order.renting_for ===  4 ? '#C5C7C0' : ''  }, 
                          { text: 'Essential', style: styles.Header1Center, bold: true, alignment: screenLeft, fillColor: order.renting_for ===  5 ? '#C5C7C0' : ''  }, 
                          { text: 'Other', style: styles.Header1Center, bold: true, alignment: screenLeft, fillColor: order.renting_for ===  6 ? '#C5C7C0' : ''  }, 
                        ],                        
                      ]
                    },
                    layout: {                     
                      paddingTop:  function(i, node) { return 5; },
                      paddingBottom: function(i, node) { return 5; }, 
                    },  
                  }],
                  [{
                    border: [true, false, true, false],
                    table: {
                      widths: ['*'], 
                      body: budgetComment(data.budgetComment),
                      // [
                      //   [
                      //     { text: 'ADDITIONAL COMMENTS', style: styles.Header1Center, bold: true, alignment: screenLeft, fillColor:  '#C5C7C0'  }, 
                      //   ],
                      //   [{}],[{}],[{}],[{}],
                        
                      // ]
                    },
                    layout: {                                           
                      paddingBottom: function(i, node) { return 15; }, 
                    },  
                  }],
                  [{
                    border: [true, false, true, false],
                    table: {
                      widths: ['*'],
                      body: [
                        [
                          { text: 'CUSTOMER DECLARATION: ', bold: true, alignment: screenLeft, fontSize: 9 , fillColor: '#C5C7C0'}
                        ],  
                        [
                          {style:styles.margins, fillColor: '#C5C7C0', text: [  
                            { text: 'I ', alignment: screenLeft,  bold: true, fontSize:8},                    
                            { text: customer.customer_name , alignment: screenLeft,  bold: true, fontSize:9},
                            { text: ' understand, that by singing this budget form is to confirm that all of the date provided above is ture and correct as of the date that this declaration was signed and dated', alignment: screenLeft,  bold: true, fontSize:8},
                            { text: '\n\n\nSIGNED_______________________________________________________________', alignment: screenLeft,  bold: true, fontSize:8},
                            { text: '\t\t\t\t\t\t\t\t\tDATE:  ' + getCurrentDateDDMMYYYY(), alignment: screenLeft,  bold: true, fontSize:8},
                          ]}
                        ],
                      ]
                    },
                  }],
        ],              
      },
    },
  ],
  //   styles: {
  //     // Header
  //     Header1Center: {
  //       fontSize: 8,
  //       alignment: 'center',
  //     },
  //     Header2Center: {
  //       fontSize: 13,
  //       alignment: 'center',
  //     },
  //     Header3Center: {
  //       fontSize: 9,
  //       alignment: 'center',
  //     },
  //     custoemr: {        
  //       alignment: 'right',
  //     },
  //     alignRight: {  
  //       fontSize: 8,      
  //       alignment: 'right',
  //     },
  //     margins:{
  //       margin: [10,0,0,0]
  //     },
  //     // Customer: {
  //     //   fontSize: 10,
  //     //   alignment: 'left',
  //     //   margin: [40, 5]
  //     // },
  //     ItemHeader: {
  //       fontSize: 10,
  //       bold: true
  //     },
  //     Common: {
  //       fontSize: 10,
  //     }
  //   },
    pageSize: 'A4',
    pageOrientation: 'portrait',
  }
  return dd ;
}