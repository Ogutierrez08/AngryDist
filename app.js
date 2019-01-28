var _fs = require('fs')
var sql = require('mssql')

const config = {
  user: 'sa',
  password: '123456',
  server: '192.168.0.31', 
  database: 'Rex',
  'requestTimeout': 60000,
  'options': {
    'encrypt': false
  }
}

generateVentasCsv(() => {
  console.log('Ventas.csv generado correctamente')
  generateStockCsv(() => {
    console.log('Stock.csv generado correctamente')
    generateProductCsv(() => {
      console.log('Productos.csv generado correctamente')
      generateClientCsv(() => {
        console.log('Clientes.csv generado correctamente')
        generateVendedoresCsv(() => {
          console.log('Vendedores.csv generado correctamente')
        })
      })
    })
  })
})



function generateVentasCsv(onSuccess){
var consulta = `exec sp_Clientes_csv`

sql.connect(config,function(err){
  if(err) console.log(err)
  
  var request = new sql.Request()

  request.query(consulta).then((value) => {
    _fs.writeFileSync('./ventas.csv',value.recordset.map((data) => {
      return Object.values(data).join('|') + '\n'

    }).join(''))
    sql.close()
    onSuccess()
  })
})
}

function generateStockCsv(onSuccess){
  var consulta = 'exec sp_Stock_csv'
  sql.connect(config,function(err){
    if(err)console.log(err)

    var request = new sql.Request()
    
    request.query(consulta).then((value) => {
      _fs.writeFileSync('./stock.csv',value.recordset.map((data) => {
        return Object.values(data).join('|') + '\n'
      }).join(''))
      sql.close()
      onSuccess()
    })
  })
}

function generateProductCsv(onSuccess){
  var consulta = 'exec sp_Productos_csv'
  sql.connect(config,function(err){
    if(err)console.log(err)

    var request = new sql.Request()

    request.query(consulta).then((value) => {
      _fs.writeFileSync('./productos.csv',value.recordset.map((data) => {
        return Object.values(data).join('|') + '\n'
      }).join(''))
      sql.close()
      onSuccess()
    })
  })
}

function generateClientCsv(onSuccess){
  var consulta  = 'exec sp_Clientes_csv'
  sql.connect(config, function(err){
    if(err)console.log(err)

    var request = new sql.Request()

    request.query(consulta).then((value) => {
      _fs.writeFileSync('./clientes.csv',value.recordset.map((data) => {
        return Object.values(data).join('|') + '\n'
      }).join(''))
      sql.close()
      onSuccess()
    })  
  })
}

function generateVendedoresCsv(onSuccess){
  var consulta = 'exec sp_Vendedores_csv'
  sql.connect(config,function(err){
    if(err)console.log(err)

    var request = new sql.Request()

    request.query(consulta).then((value) => {
      _fs.writeFileSync('./vendedores.csv',value.recordset.map((data) => {
        return Object.values(data).join('|') + '\n'
      }).join(''))
      sql.close()
      onSuccess()
    })
  })
}

