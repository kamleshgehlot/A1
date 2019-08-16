
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

  console.log(franchise);
  console.log("product", products);
  console.log(orderType);
  console.log(customer);
  console.log(budget);
  console.log(order);
  console.log(user);

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
               [ { image: 'data:image/jpeg;base64,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', 
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
                        // {style:'margins', bold: true, text: [  
                        //   { text: 'FULL NAME:\t\t\t\t\t' + customer[0].customer_name + '\n', style: 'Header1Center',  bold: true,  alignment: screenLeft }, 
                        //   { text: 'ADDRESS:\t\t\t\t\t\t' + customer[0].address + ',\n', style: 'Header1Center', alignment: screenLeft }, 
                        //   { text: 'CITY:\t\t\t\t\t\t\t\t' + customer[0].city + ' - '+ customer[0].postcode + '\n', style: 'Header1Center', alignment: screenLeft }, 
                        //   { text: 'TELEPHONE:\t\t\t\t\t\t000', style: 'Header1Center', alignment: screenLeft, bold: true }, 
                        //   { text: customer[0].telephone + '\t\t', style: 'Header1Center', alignment: screenLeft }, 
                        //   { text: 'MOBILE:\t\t\t\t\t\t', style: 'Header1Center', alignment: screenLeft, bold: true }, 
                        //   { text: customer[0].mobile + '\n', style: 'Header1Center', alignment: screenLeft }, 
                        //   { text: 'EMAIL:\t\t\t\t\t\t\t\t' , style: 'Header1Center', alignment: screenLeft, bold: true }, 
                        //   { text: customer[0].email + '\n', style: 'Header1Center', alignment: screenLeft }, 
                        //   { text: 'DATE OF BIRTH:\t\t\t\t\t\t' +  customer[0].dob, style: 'Header1Center', alignment: screenLeft }, 
                        //   { text: '\nWORKING STATUS:\t\t\t\t\t\t' + (customer[0].is_working == 1 ? 'Yes' : 'No'), style: 'Header1Center', alignment: screenLeft }, 
                        // ]}
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
                  { text: 'New Customer :' + 'Yes', style: 'Header1Center', alignment: screenLeft,  bold: true, }, 
                  { text: '\nExisting Customer :' + 'No', style: 'Header1Center', alignment: screenLeft,  bold: true, }, 
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
                  { text: 'FREQUENCY OF PAYMENT',  bold: true, alignment: screenLeft, fontSize:8, },                   
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
                    { text: '\t\t\t\t\t\t\t\tEXPECTED DELIVERY DATE:  ' +  orderType[0].exp_delivery_at.split('T')[0] , alignment: screenLeft,  bold: true, fontSize:8}, 
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