
export default function layout(data,order) {

  const franchise = data.franchise;
  const products = data.product;
  const customer = data.customer;
  const orderType = data.flexOrder;
  const budget = data.budget; 

  console.log(franchise);
  console.log(products);
  console.log(orderType);
  console.log(customer);
  console.log(budget);
  console.log(order);

  const body = [];

  // console.log('pdf----', orderId);
  // loop.map(data =>{
  body.push(
    { text: 'data', style: 'margins', bold: true, alignment: screenLeft, fontSize: 8,  },
    { text: 'data', style: 'margins', bold: true, alignment: screenLeft, fontSize: 8,  },
    { text: 'data', style: 'margins', bold: true, alignment: screenLeft, fontSize: 8,  },
    )
  // });





  var dd = {
    content: 
      [
        // {image: 'images/rentronics_logo.jpg', fit: [100, 100]},
          { 
            columns: [                 
               { text: [{ text: franchise[0].location + '\n', style: 'Header1Center' },{ text: '[PH] ', style: 'Header1Center', bold: true },{ text: franchise[0].contact + '\n', style: 'Header1Center' },{ text: 'Email: ', style: 'Header1Center', bold: true },{ text: franchise[0].email + '\n', style: 'Header1Center' } ]}, 
              //  {  text: [{ text: franchise[0].franchise_name , style: 'Header2Center', bold: true }, { text: '\nRENT-FLEX ORDER FORM', style: 'Header2Center', bold: true } ]},
              //  { text: franchise[0].franchise_name , style: 'Header2Center', bold: true },
               { text: '\nRENT-FLEX ORDER FORM', style: 'Header2Center', bold: true }, 
               { text: 'Application#: ' + order.order_id , style: 'Header3Center'},
              //  { text: [{text: 'Application# :' + '0000007', style: 'Header3Center'}, {text: '\n\nDate: ' + '13/08/2019', style: 'Header3Center'}]}
            ]
          },
          {
            table: {
              widths: ['*'],
              body: [
                  [{
                     border: [true, true, true, false],
                      table: {
                        widths: ['*','*','*','*'],
                        body: [
                          [
                            
                            { text: 'Date: ' + new Date().getDate() + '/' + (new Date().getMonth() + 1) + '/' + (new Date().getFullYear()), style: 'Header3Center', bold: true, alignment: screenLeft }, 
                            { text: 'Team Leader: ' + '', style: 'Header3Center', bold: true, alignment: screenLeft }, 
                            { text: 'Salesperson: ', style: 'Header3Center', bold: true, alignment: screenLeft }, 
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
                body: [
                  [
                    { text: 'PRODUCT AND CREDIT DETAILS: ', colSpan: 3, style: 'margins', bold: true, alignment: screenLeft, fontSize: 10,  }, {},{}, 
                  ],
                  [
                    { text: 'Product', style: 'margins', bold: true, alignment: screenLeft, fontSize: 8,  },
                    { text: 'Description', style: 'margins', bold: true, alignment: screenLeft, fontSize: 8,  },
                    { text: 'Payment Type', style: 'margins', bold: true, alignment: screenLeft, fontSize: 8,  },                    
                  ],
                  body                  
                ]
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
                    { text: '\t\t\t\t\t\t\t\t\tDATE:  ' + '14/08/2019', alignment: screenLeft,  bold: true, fontSize:8},
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