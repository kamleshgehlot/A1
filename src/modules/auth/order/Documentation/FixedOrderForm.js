import { logo } from '../../../common/Logo.js';
import { getDate, getCurrentDate, getDateInDDMMYYYY, getCurrentDateDDMMYYYY } from '../../../../utils/datetime';
import { styles } from './Styles.js';


function buildTableBody(data, columns, valueKeys, orderType) {
  var body = [];

  body.push([
    { text: 'PRODUCT AND CREDIT DETAILS: ', style: styles.margins, bold: true, alignment: screenLeft, fontSize: 10, colSpan: 3}, {},{}
  ]);

  var dataRow1 = [];

  dataRow1.push(
    { text: columns[0], style: styles.margins, bold: true, alignment: screenLeft, fontSize: 8 }
  );
  dataRow1.push(    
    { text: columns[1], style: styles.margins, bold: true, alignment: screenLeft, fontSize: 8 }
  );
  dataRow1.push(
    { text: columns[2], style: styles.margins, bold: true, alignment: screenLeft, fontSize: 8 }                   
  );

  body.push(dataRow1);

  data.forEach(function(row) {
    var dataRow = [];

    valueKeys.forEach(function(column) {
      if(column === 'paymentType') {
        dataRow.push({ text: orderType[0].frequency == 1 ? 'WEEKLY PAYMENT' :  'FORTNIGHTLY PAYMENT', style: styles.margins, bold: true, alignment: screenLeft, fontSize: 8,  },);

      } else {
        dataRow.push({ text: row[column.toLowerCase()], style: styles.margins, bold: true, alignment: screenLeft, fontSize: 8,  },);
      }
    })

    body.push(dataRow);
  });

  return body;
}


export default function FixedOrderForm(data,order) {

  const franchise = data.franchise;
  const products = data.product;
  const customer = data.customer;
  const orderType = data.fixedOrder;
  const budget = data.budget; 
  const user = data.user; 

  // console.log(franchise);
  // console.log("product", products);
  // console.log(orderType);
  console.log(customer);
  console.log(budget);
  // console.log(order);
  // console.log(user);

 

  var dd = {
    content: 
      [        
          { 
            columns: [                 
              { text: [
                 { text: '\n' + franchise[0].location + '\n', style: styles.Header1Center },
                 { text: '[PH] ', style: styles.Header1Center, bold: true },
                 { text: franchise[0].contact + '\n', style: styles.Header1Center },
                 { text: 'Email: ', style: styles.Header1Center, bold: true },
                 { text: franchise[0].email + '\n', style: styles.Header1Center } 
                ]
              },
               [ { image: logo,  fit: [150, 150], style: styles.Header2Center},
                 {text: 'RENT-FIX ORDER FORM', style: styles.Header2Center, bold: true }, 
               ],
               { text: '\n\n\nApplication#: ' + order.order_id , style: styles.Header3Center},
            ]
          },
          {
            table: {
              widths: ['*'],
              body: [
                  [{
                     border: [true, true, true, false],
                      table: {
                        widths: [70,'*','*','*'],
                        body: [
                          [
                            
                            { text: 'Date: ' + getCurrentDateDDMMYYYY(), style: styles.Header3Center, bold: true, alignment: screenLeft }, 
                            { text: 'Team Leader: ' + '', style: styles.Header3Center, bold: true, alignment: screenLeft }, 
                            { text: 'Salesperson: ' + user[0].name , style: styles.Header3Center, bold: true, alignment: screenLeft }, 
                            { text: 'Sales Type: ', style: styles.Header3Center, bold: true, alignment: screenLeft }, 
                          ]
                        ]
                      },                      
                  }],
                  [{
                    border: [true, false, true, false],
                    table: {
                      widths: ['*'],                    
                      body: [
                        [
                          { text: 'CUSTOMER DETAILS: ', style: styles.margins, bold: true, alignment: screenLeft, fontSize: 10 , fillColor: '#C5C7C0' }, 
                        ],
                        [                     
                        {style:styles.margins, text: [  
                          { text: customer[0].customer_name + '\n', style: styles.Header1Center,  bold: true,  alignment: screenLeft }, 
                          { text: customer[0].address + ',\n', style: styles.Header1Center, alignment: screenLeft }, 
                          { text: customer[0].city + ' - '+ customer[0].postcode + '\n', style: styles.Header1Center, alignment: screenLeft }, 
                          { text: 'PH: ', style: styles.Header1Center, alignment: screenLeft, bold: true }, 
                          { text: customer[0].telephone + '\t\t', style: styles.Header1Center, alignment: screenLeft }, 
                          { text: 'Mobile: ', style: styles.Header1Center, alignment: screenLeft, bold: true }, 
                          { text: customer[0].mobile + '\n', style: styles.Header1Center, alignment: screenLeft }, 
                          { text: 'Email: ', style: styles.Header1Center, alignment: screenLeft, bold: true }, 
                          { text: customer[0].email + '\n', style: styles.Header1Center, alignment: screenLeft }, 
                          { text: 'Date of Birth: ' + customer[0].dob, style: styles.Header1Center, alignment: screenLeft }, 
                          { text: '\nWorking Status :' + (customer[0].is_working == 1 ? 'Yes' : 'No'), style: styles.Header1Center, alignment: screenLeft }, 
                        ]}
                        ],
                      ]
                    },
                // layout: 'noBorders'
                }],
                [{
                  border: [true, false, true, false],
                  table: {
                    widths: ['*'],                   
                    body: [
                      [
                        { text: 'ID Sighted: ', style: styles.margins, bold: true, alignment: screenLeft, fontSize: 10 }, 
                      ],
                      [
                      {style:styles.margins, text: [  
                        { text: customer[0].id_type_name + '\t\t\t\t\t', style: styles.Header1Center,  bold: true,  alignment: screenLeft }, 
                        customer[0].id_type === 2 ? { text: 'V# : ' + customer[0].dl_version_number + '\t\t\t\t\t', style: styles.Header1Center,  alignment: screenLeft } : '',
                        { text: 'ID# : '+ customer[0].id_number +'\t\t\t\t\t', style: styles.Header1Center, alignment: screenLeft }, 
                        { text: 'Expiry Date: ' + getDateInDDMMYYYY(customer[0].expiry_date) +  '\n', style: styles.Header1Center, alignment: screenLeft },                         
                      ]}
                      ],
                    ]
                  },
              // layout: 'noBorders'
              }],
              [{
                border: [true, false, true, false],
                table: {
                  widths: ['*','*'],
                  // margin: [100,20,10,40],
                  // fillColor: 'gray',
                  // background: 'gray',
                  body: [
                    [
                      { text: [  
                        { text: 'ALTERNATE CONTACTS: ', style: styles.margins, bold: true, alignment: screenLeft, fontSize: 10}, 
                        { text: '(Can be your Father, Mother, Son, Daughter or a Friend)',  bold: true, alignment: screenLeft, fontSize: 7 },
                      ], colSpan: 2},{}
                    ],
                    [
                    {style:styles.margins, text: [
                      { text: 'Name:\t\t\t\t', style: styles.Header1Center,  bold: true,  alignment: screenLeft },   
                      { text: customer[0].alt_c1_name + '\n', style: styles.Header1Center,  bold: true,  alignment: screenLeft }, 
                      { text: 'Address:\t\t\t' + customer[0].alt_c1_address + '\n', style: styles.Header1Center, bold: true, alignment: screenLeft }, 
                      { text: 'Contact:\t\t\t' + customer[0].alt_c1_contact + '\n', style: styles.Header1Center, bold: true, alignment: screenLeft }, 
                      { text: 'Relationship:\t' + customer[0].alt_c1_relation , style: styles.Header1Center, bold: true, alignment: screenLeft }, 
                    ]},
                    {style:styles.margins, text: [
                      { text: 'Name:\t\t\t\t', style: styles.Header1Center,  bold: true,  alignment: screenLeft },   
                      { text: customer[0].alt_c2_name + '\n', style: styles.Header1Center,  bold: true,  alignment: screenLeft }, 
                      { text: 'Address:\t\t\t' + customer[0].alt_c2_address + '\n', style: styles.Header1Center, bold: true, alignment: screenLeft }, 
                      { text: 'Contact:\t\t\t' + customer[0].alt_c2_contact + '\n', style: styles.Header1Center, bold: true, alignment: screenLeft }, 
                      { text: 'Relationship:\t' + customer[0].alt_c2_relation , style: styles.Header1Center, bold: true, alignment: screenLeft }, 
                    ]},
                    ],
                  ]
                },
            // layout: 'noBorders'
            }],
            [{
              border: [true, false, true, true],
              table: {
                widths: ['*','*','*'],                
                body:buildTableBody(products, ['Product', 'Description', 'Payment Type'], ['name', 'description', 'paymentType'], orderType),                  
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
                {style:styles.margins, text: [  
                  { text: 'New Customer :' + (order.customer_type===1 ? 'Yes' : order.customer_type===2 ? 'No' : ''), style: styles.Header1Center, alignment: screenLeft,  bold: true, }, 
                  { text: '\nExisting Customer :' + (order.customer_type===2 ? 'Yes' : order.customer_type===1 ? 'No' : ''), style: styles.Header1Center, alignment: screenLeft,  bold: true, }, 
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
                  { text: 'DAY YOU GET PAID [ ' + budget[0].paid_day + ' ]',  bold: true, alignment: screenLeft, fontSize: 8 }, 
                  { text: 'DAY PAYMENT DEBITED [ ' + budget[0].debited_day + ' ]',  bold: true, alignment: screenLeft, fontSize: 8 }, 
                  { text: 'PAYMENT START DATE: ' +  getDateInDDMMYYYY(orderType[0].first_payment),  bold: true, alignment: screenLeft, fontSize: 8 }, 
                ],
                [
                  { text: 'FREQUENCY OF PAYMENT',  bold: true, alignment: screenLeft, fontSize:8, fillColor: '#C5C7C0'  },                   
                  { text: '$' +  orderType[0].each_payment_amt +'  '+ (orderType[0].frequency == 1 ? 'PAID WEEKLY' :  'PAID FORTNIGHTLY'),   bold: true, alignment: screenLeft, fontSize:8, colSpan: 2 }, {}                 
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
                  {style:styles.margins, text: [  
                    { text: 'MINIMUM PAYMENTS:  ' + orderType[0].minimum_payment_amt , alignment: screenLeft,  bold: true, fontSize:8}, 
                    { text: '\t\t\t\t\t\t\t\tTOTAL AMOUNT: $' + orderType[0].total_payment_amt , alignment: screenLeft,  bold: true, fontSize:8}, 
                    { text: '\t\t\t\t\t\t\t\tEXPECTED DELIVERY DATE:  ' +  getDateInDDMMYYYY(orderType[0].exp_delivery_date), alignment: screenLeft,  bold: true, fontSize:8}, 
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
                  { text: 'RENT-FIX TERM: ', bold: true, alignment: screenLeft, fontSize: 10 , fillColor: '#C5C7C0'}
                ],  
                [
                  {style:styles.margins, text: [  
                    { text: 'START DATE:  ' + getDateInDDMMYYYY(orderType[0].first_payment) , alignment: screenLeft,  bold: true, fontSize:8}, 
                    { text: '\t\t\t\t\t\t\t\tEND DATE:  ' + getDateInDDMMYYYY(orderType[0].last_payment), alignment: screenLeft,  bold: true, fontSize:8}, 
                    { text: '\t\t\t\t\t\t\t\tTOTAL PAYMENTS:  ' +  orderType[0].no_of_payment, alignment: screenLeft,  bold: true, fontSize:8}, 
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
                  {style:styles.margins, text: [  
                    { text: 'I ', alignment: screenLeft,  bold: true, fontSize:8},                    
                    { text: customer[0].customer_name , alignment: screenLeft,  bold: true, fontSize:9}, 
                    { text: ' agree to RENT-PURCHASE THE GOOD(s) above on the terms and conditions in this RENT-FIX CONTRACT and in the general terms and conditions and confirm to the best of my knowledge that all the above information is true and correct.', alignment: screenLeft,  bold: true, fontSize:8},                    
                    { text: '\n\n\nSIGNED_______________________________________________________________', alignment: screenLeft,  bold: true, fontSize:8},
                    { text: '\t\t\t\t\t\t\t\t\tDATE:  ' + getCurrentDate(), alignment: screenLeft,  bold: true, fontSize:8},
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
                  {style:styles.margins, text: [  
                    { text: 'Summary of your right to cancel under section 36F(1) of the Fair Trading Act 1986',italics: true, alignment: screenLeft,  bold: true, fontSize:8},                    
                    { text: '\\t\t\t\tThe Fair Trading Act 1986 gives you a right to cancel this Rent-Fix Contract: at any time before you take possession of the Goods; and in any way (including oral or written) that shows your intention to cancel or withdraw from this Rent-Fix Contract.', alignment: screenLeft,  fontSize:8},                    
                   

                    { text: '\nSummary of your right to cancel under Section 36M(1) of the Fair Trading Act 1986:',italics: true, alignment: screenLeft, bold: true,  fontSize:8},
                    { text: '\n\t\t\t\tWithin 5 working days after the date youreceive a copy of this Rent-Fix Contract; or if we fail to make disclosure under section 36L of the Act, at any time.', alignment: screenLeft,   fontSize:8},

                   
                    { text: '\nThis statement only contains a summary of your rights and obligations in connection with your right to cancel. If there is anything about your rights or obligations under the Fair Trading Act 1986 that you do not understand, if there is a dispute about your rights, or if you think that we are being unreasonable in any way, you should seek legal advice immediately', alignment: screenLeft,   fontSize:8},
                  ]}
                ],
              ]
            },
    }
  ],  
   
    pageSize: 'A4',
    pageOrientation: 'portrait',
  }
  
  
  return dd ;
}