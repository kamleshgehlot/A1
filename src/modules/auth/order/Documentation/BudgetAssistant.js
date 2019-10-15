import { logo } from '../../../common/Logo.js';

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

  // console.log(franchise);
  // console.log("product", products);
  // console.log(orderType);
  // console.log(customer);
  // console.log(budget);
  // console.log(order);
  // console.log(user);

  // const productList = [];

//   products.forEach(function(data) {
//   var dataRow = [];
//   // dataRow.push('[');
//   dataRow.push({ text: data.name, style: 'margins', bold: true, alignment: screenLeft, fontSize: 8,  },);
//   dataRow.push({ text: data.description, style: 'margins', bold: true, alignment: screenLeft, fontSize: 8,  },);
//   dataRow.push({ text: (orderType[0].frequency == 1 ? 'WEEKLY PAYMENT' :  'FORTNIGHTLY PAYMENT'), style: 'margins', bold: true, alignment: screenLeft, fontSize: 8,  },);  
//   // dataRow.push(']');
//   productList.push(dataRow)
// });
// var body_temp = [];
// console.log('pdf----', orderId);
  // products.map(data =>{
  //   // console.log(data)
  //   productList.toString([
  //   // productList.append([
  //     { text: data.name,  bold: true, alignment: screenLeft, fontSize: 8,  },
  //     { text: data.description,  bold: true, alignment: screenLeft, fontSize: 8,  },
  //     { text: (orderType[0].frequency == 1 ? 'WEEKLY PAYMENT' :  'FORTNIGHTLY PAYMENT'),  bold: true, alignment: screenLeft, fontSize: 8,  },
  //   ],
  //   );
  // });

// console.log('pdf----', [productList]);

  var dd = {
    content: 
      [
        
          { 
            columns: [                 
               { text: [{ text: '\n' + franchise[0].location + '\n', style: 'Header1Center' },{ text: '[PH] ', style: 'Header1Center', bold: true },{ text: franchise[0].contact + '\n', style: 'Header1Center' },{ text: 'Email: ', style: 'Header1Center', bold: true },{ text: franchise[0].email + '\n', style: 'Header1Center' } ]}, 
               [ { image: logo,
                  fit: [150, 150], style: 'Header2Center'},
                 {text: 'RENT-FLEX ORDER FORM', style: 'Header2Center', bold: true }, 
               ],
               { text: '\n\n\nApplication#: ' + order.order_id , style: 'Header3Center'},
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
                            
                            { text: 'Date: ' + new Date().getDate() + '/' + (new Date().getMonth() + 1) + '/' + (new Date().getFullYear()), style: 'Header3Center', bold: true, alignment: screenLeft }, 
                            { text: 'Team Leader: ' + '', style: 'Header3Center', bold: true, alignment: screenLeft }, 
                            { text: 'Salesperson: ' + user[0].name , style: 'Header3Center', bold: true, alignment: screenLeft }, 
                            { text: 'Sales Type: ', style: 'Header3Center', bold: true, alignment: screenLeft }, 
                          ]
                        ]
                      },                      
                  }],
                  [{
                    border: [true, false, true, false],
                    table: {
                      widths: ['*'],
                      // margin: [100,20,10,40],
                      // fillColor: 'gray',
                      // background: 'gray',
                      body: [
                        [
                          { text: 'CUSTOMER DETAILS: ', style: 'margins', bold: true, alignment: screenLeft, fontSize: 10 , fillColor: '#C5C7C0' }, 
                        ],
                        [
                       
                        {style:'margins', text: [  
                          { text: customer[0].customer_name + '\n', style: 'Header1Center',  bold: true,  alignment: screenLeft }, 
                          { text: customer[0].address + ',\n', style: 'Header1Center', alignment: screenLeft }, 
                          { text: customer[0].city + ' - '+ customer[0].postcode + '\n', style: 'Header1Center', alignment: screenLeft }, 
                          { text: 'PH: ', style: 'Header1Center', alignment: screenLeft, bold: true }, 
                          { text: customer[0].telephone + '\t\t', style: 'Header1Center', alignment: screenLeft }, 
                          { text: 'Mobile: ', style: 'Header1Center', alignment: screenLeft, bold: true }, 
                          { text: customer[0].mobile + '\n', style: 'Header1Center', alignment: screenLeft }, 
                          { text: 'Email: ', style: 'Header1Center', alignment: screenLeft, bold: true }, 
                          { text: customer[0].email + '\n', style: 'Header1Center', alignment: screenLeft }, 
                          { text: 'Date of Birth: ' + customer[0].dob, style: 'Header1Center', alignment: screenLeft }, 
                          { text: '\nWorking Status :' + (customer[0].is_working == 1 ? 'Yes' : 'No'), style: 'Header1Center', alignment: screenLeft }, 
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
                    // margin: [100,20,10,40],
                    // fillColor: 'gray',
                    // background: 'gray',
                    body: [
                      [
                        { text: 'ID Sighted: ', style: 'margins', bold: true, alignment: screenLeft, fontSize: 10 }, 
                      ],
                      [
                      {style:'margins', text: [  
                        { text: customer[0].id_type_name + '\t\t\t\t\t', style: 'Header1Center',  bold: true,  alignment: screenLeft }, 
                        { text: 'ID# : '+ customer[0].id_number +'\t\t\t\t\t', style: 'Header1Center', alignment: screenLeft }, 
                        { text: 'Expiry Date: ' + customer[0].expiry_date +  '\n', style: 'Header1Center', alignment: screenLeft },                         
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
                        { text: 'ALTERNATE CONTACTS: ', style: 'margins', bold: true, alignment: screenLeft, fontSize: 10}, 
                        { text: '(Can be your Father, Mother, Son, Daughter or a Friend)',  bold: true, alignment: screenLeft, fontSize: 7 },
                      ], colSpan: 2},{}
                    ],
                    [
                    {style:'margins', text: [
                      { text: 'Name:\t\t\t\t', style: 'Header1Center',  bold: true,  alignment: screenLeft },   
                      { text: customer[0].alt_c1_name + '\n', style: 'Header1Center',  bold: true,  alignment: screenLeft }, 
                      { text: 'Address:\t\t\t' + customer[0].alt_c1_address + '\n', style: 'Header1Center', bold: true, alignment: screenLeft }, 
                      { text: 'Contact:\t\t\t' + customer[0].alt_c1_contact + '\n', style: 'Header1Center', bold: true, alignment: screenLeft }, 
                      { text: 'Relationship:\t' + customer[0].alt_c1_relation , style: 'Header1Center', bold: true, alignment: screenLeft }, 
                    ]},
                    {style:'margins', text: [
                      { text: 'Name:\t\t\t\t', style: 'Header1Center',  bold: true,  alignment: screenLeft },   
                      { text: customer[0].alt_c2_name + '\n', style: 'Header1Center',  bold: true,  alignment: screenLeft }, 
                      { text: 'Address:\t\t\t' + customer[0].alt_c2_address + '\n', style: 'Header1Center', bold: true, alignment: screenLeft }, 
                      { text: 'Contact:\t\t\t' + customer[0].alt_c2_contact + '\n', style: 'Header1Center', bold: true, alignment: screenLeft }, 
                      { text: 'Relationship:\t' + customer[0].alt_c2_relation , style: 'Header1Center', bold: true, alignment: screenLeft }, 
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
      Header1Center: {
        fontSize: 8,
        alignment: 'center',
      },
      Header2Center: {
        fontSize: 13,
        alignment: 'center',
      },
      Header3Center: {
        fontSize: 9,
        alignment: 'center',
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