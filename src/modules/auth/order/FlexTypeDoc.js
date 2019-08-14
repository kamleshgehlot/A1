export default function layout() {
  const loop = [1,2,3,4,5];
 var dd = {
    content: 
      [
        // {image: 'images/rentronics_logo.jpg', fit: [100, 100]},
          { 
            columns: [                 
               { text: [{ text: '40 Connaught Street,\n', style: 'Header1Center' },{ text: 'Blockhouse Bay, Auckland\n', style: 'Header1Center' },{ text: '[PH] ', style: 'Header1Center', bold: true },{ text: '0800-028512\n', style: 'Header1Center' },{ text: 'Email: ', style: 'Header1Center', bold: true },{ text: 'info@rentronics.co.nz\n', style: 'Header1Center' } ]}, 
               { text: '\n\nRENT-FLEX ORDER FORM', style: 'Header2Center', bold: true }, 
               { text: [{text: 'Application# :' + '0000007', style: 'Header3Center'}, {text: '\n\nDate: ' + '13/08/2019', style: 'Header3Center'}]}
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
                            
                            { text: 'Date: ' + '13/08/2019', style: 'Header3Center', bold: true, alignment: screenLeft }, 
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
                          { text: 'CUSTOMER DETAILS: ', style: 'margins', bold: true, alignment: screenLeft, fontSize: 10 , fillColor: 'gray' }, 
                        ],
                        [
                        {style:'margins', text: [  
                          { text: 'Shahrukh Khan\n', style: 'Header1Center',  bold: true,  alignment: screenLeft }, 
                          { text: 'Kaga Road Outside Nagori Gate,\n', style: 'Header1Center', alignment: screenLeft }, 
                          { text: 'Jodhpur (Raj.) - 342006\n', style: 'Header1Center', alignment: screenLeft }, 
                          { text: 'PH: ', style: 'Header1Center', alignment: screenLeft, bold: true }, 
                          { text: '02912585412\t\t', style: 'Header1Center', alignment: screenLeft }, 
                          { text: 'Mobile: ', style: 'Header1Center', alignment: screenLeft, bold: true }, 
                          { text: '08290447404\n', style: 'Header1Center', alignment: screenLeft }, 
                          { text: 'Email: ', style: 'Header1Center', alignment: screenLeft, bold: true }, 
                          { text: 'sktanwar.2014@gmail.com\n', style: 'Header1Center', alignment: screenLeft }, 
                          { text: 'Date of Birth: ' + '04/01/2019', style: 'Header1Center', alignment: screenLeft }, 
                          { text: '\nWorking Status :' + 'Yes', style: 'Header1Center', alignment: screenLeft }, 
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
                        { text: 'Passport\t\t\t\t\t', style: 'Header1Center',  bold: true,  alignment: screenLeft }, 
                        { text: 'ID# : '+ '1458/2547/1250\t\t\t\t\t', style: 'Header1Center', alignment: screenLeft }, 
                        { text: 'Expiry Date : 25/08/2025\n', style: 'Header1Center', alignment: screenLeft },                         
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
                      { text: '1).', style: 'Header1Center',  bold: true,  alignment: screenLeft },   
                      { text: 'Kamlesh Gehlot\n', style: 'Header1Center',  bold: true,  alignment: screenLeft }, 
                      { text: '' + 'Pal Road, Kheme Ka Kua,\n', style: 'Header1Center', alignment: screenLeft }, 
                      { text: '' + 'Jodhpur (Raj.) - 342006\n', style: 'Header1Center', alignment: screenLeft }, 
                      { text: '' + 'Friend of Customer', style: 'Header1Center', alignment: screenLeft }, 
                    ]},
                    {style:'margins', text: [
                      { text: '2).', style: 'Header1Center',  bold: true,  alignment: screenLeft },   
                      { text: 'Bhagyashree Mathur\n', style: 'Header1Center',  bold: true,  alignment: screenLeft }, 
                      { text: '' + 'Chopasani, First Pulia,\n', style: 'Header1Center', alignment: screenLeft }, 
                      { text: '' + 'Jodhpur (Raj.) - 342006\n', style: 'Header1Center', alignment: screenLeft }, 
                      { text: '' + 'Friend of Customer', style: 'Header1Center', alignment: screenLeft}, 
                    ]}
                    ],
                  ]
                },
            // layout: 'noBorders'
            }],
            [{
              border: [true, false, true, false],
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
                  // loop.map((data,index)=>{
                  //   return(
                  //     // [
                  //       console.log('helo')
                  //       // { text: 'Product', style: 'margins', bold: true, alignment: screenLeft, fontSize: 8,},
                  //       // { text: 'Description', style: 'margins', bold: true, alignment: screenLeft, fontSize: 8,  },
                  //       // { text: 'Payment Type', style: 'margins', bold: true, alignment: screenLeft, fontSize: 8,  },                    
                  //     // ]
                  //   )
                  // })
                ]
              },
          }],
        ],              
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
        fontSize: 15,
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