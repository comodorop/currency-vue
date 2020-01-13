<template>
  <v-container>
    
    <v-row>
      <v-col>
        <label style="font-size: 24px">Balance aproximado en pesos</label>
        <br>
        <label style="font-size: 28px">{{obj.total | currency}}</label>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card class="d-inline-block mx-auto" 
        min-width="220"
        color="#49cc68">
        <v-container>
          <v-row justify="space-between">
            <v-col cols="auto">
            <h2 style="font-size: 22px; color: white">Pesos</h2>
            <br/>
            <label for="" style="font-size: 26px; color:white">{{obj.pesos | currency}}</label>
            </v-col>
           </v-row>
          </v-container>
        </v-card>
      </v-col>
      <v-col>
        <v-card class="d-inline-block mx-auto" 
        min-width="220"
        >
        <v-container>
          <v-row justify="space-between">
            <v-col cols="auto">
            <h2 style="font-size: 22px; ">Dolares</h2>
            <br/>
            <label for="" style="font-size: 26px; ">{{obj.dollars | currency}}</label>
            </v-col>
           </v-row>
          </v-container>
        </v-card>
      </v-col>
      <v-col>
        <v-card class="d-inline-block mx-auto" 
        min-width="220"
        >
        <v-container>
          <v-row justify="space-between">
            <v-col cols="auto">
            <h2 style="font-size: 22px; ">Bitcoins</h2>
            <br/>
            <label for="" style="font-size: 26px; ">{{obj.bitcoins}} BTC</label>
            </v-col>
           </v-row>
          </v-container>
        </v-card>
      </v-col>
      <v-col>
        <v-card class="d-inline-block mx-auto" 
        min-width="220"
        >
        <v-container>
          <v-row justify="space-between">
            <v-col cols="auto">
            <h2 style="font-size: 22px; ">Yuans</h2>
            <br/>
            <label for="" style="font-size: 26px; ">{{obj.yuan | currency}}</label>
            </v-col>
           </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="6">
        <v-card width="100%" class="d-inline-block mx-auto">
        <v-card-title>
          Hola.!
        </v-card-title>
        <v-card-subtitle>
          Estos son tus movimientos recientes
        </v-card-subtitle>
        <v-divider class="mx-4"></v-divider>
        <v-row style="margin: 0;" height="10000" cols="12" v-for="(item, index) in data"
          :key="index">
          <v-col cols="1"></v-col>
            <v-col cols="8">
              <label style="font-size: 18px" v-if="item.typeTransactions === 'payments'" for="">Abono de {{item.currency}}</label>
               <label style="font-size: 18px" v-if="item.typeTransactions === 'withdrawal'" for="">Retiro en {{item.currency}}</label>
            </v-col>
            <v-col cols="2">
              <v-list-item-content>
                <v-list-item-title style="font-size: 18px">{{item.amount | currency}}</v-list-item-title>
                <!-- {{item.currency}} -->
                <v-list-item-subtitle v-if="item.currency === 'Yuans'">{{ convertYuanesToMxn(item.amount) | currency}} MXN </v-list-item-subtitle>
                <v-list-item-subtitle v-if="item.currency === 'Dolares'">{{ convertDllToMxn(item.amount) | currency}} MXN</v-list-item-subtitle>
                <v-list-item-subtitle v-if="item.currency === 'Pesos'">{{ item.amount | currency}} MXN</v-list-item-subtitle>
                <v-list-item-subtitle v-if="item.currency === 'BitCoins'">{{ convertBitCoinToMxn(item.amount) | currency}} MXN</v-list-item-subtitle>
                
              </v-list-item-content>
            </v-col>
            <v-col cols="1"></v-col>
        </v-row>
        
      
            
        </v-card>
      </v-col>
      <v-col cols="6">
        
        <v-card width="100%" class="d-inline-block mx-auto">
          <v-card-title>
            Abonar/retirar fondos
          </v-card-title>
          <v-alert type="success" v-if="show" dismissible>
            Transaction ready
          </v-alert>
          
          <v-container>
          <v-row>
            <v-col cols="4">
          <v-select
          v-model="objData.action"
          :items="actions"
          label=""
        ></v-select>
            </v-col>
            <v-col cols="4">
              <v-select
              v-model="objData.currency"
              :items="typeCurrencies"
              label=""
        ></v-select>
            </v-col>
            <v-col cols="4"></v-col>
            </v-row>
            <v-text-field v-model="objData.quantity" style="margin-top: -20px" label="Cantidad" ></v-text-field>
            <v-btn @click="save()" rounded color="success" dark>Guardar</v-btn>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import http from "../service/http";
export default {
  name: 'HelloWorld',


  data: () => ({
    obj: {
      total: 0,
      pesos: 0,
      dollars: 0,
      bitcoins: 0,
      yuan: 0
    },
    lstCurrency : [],
    data: [{description: "Abono de bitcoin", count: ".545", currency: "BTC"},
    {description: "Retiro en dolares", count: "549.09", currency: "Dollar"}],
    actions: ["Abonar", "Retirar"],
    typeCurrencies: ["Pesos", "Dolares", "BitCoins", "Yuans"],
    show: false,
    objData: {
      action: 'Abonar',
      currency: 'Pesos',
      quantity: 0
    },
    currencies: {
      dollars: 0,
      yuan: 0,
      bitcoins: 0
    }
  }),
  methods : {
    async getValuesUsd(){
      try {
        let data = await http.get('v1/currency/dollars')
        this.currencies.dollars = data.data.data.data
      } catch (error) {
        console.log(error)
      }
    },
     async getValuesYuans(){
      try {
        let data = await http.get('v1/currency/yuanes')
        this.currencies.yuan = data.data.data.data
      } catch (error) {
        console.log(error)
      }
    }, 
    async getValueBitCoin(){
      try {
        let data = await http.getIntegrations(`https://api.coindesk.com/v1/bpi/currentprice.json`)
        this.currencies.bitcoins= data.data.bpi.USD.rate
      } catch (error) {
        console.log(error)
      }
    },
    async save(){
      
      if(this.objData.action === 'Abonar'){
        try {
          let data = await http.post('v1/payments', this.objData) 
          this.obj.total = 0 
          this.show= true
          setTimeout(() => {
            this.show = false
          }, 1500);
          this.clean()
          this.getTransactions()
          this.getSummary()
        } catch (error) {
          console.log(error)
        }
      }else if(this.objData.action === 'Retirar'){
        try {
          let data = await http.post('v1/withdrawal', this.objData)
          this.show= true
          setTimeout(() => {
            this.show = false
          }, 1500);
          this.clean()
          this.getSummary()
          this.getTransactions()
          
        } catch (error) {
          console.log(error)
        }
      }
    },
    clean(){
      
      this.objData.action = 'Abonar'
      this.objData.currency = 'Pesos',
      this.objData.quantity = 0
    },
    async getSummary(){
      try {
        this.obj.total = 0
        let data = await http.get('v1/summary')
        for(let x = 0; x < data.data.data.data.length; x ++){
          if(data.data.data.data[x].currency === 'BitCoins'){
            this.obj.bitcoins = data.data.data.data[x].total
            this.obj.total = parseFloat(this.obj.total) + parseFloat(this.convertBitCoinToMxn(this.obj.bitcoins))
          }
          if(data.data.data.data[x].currency === 'Dolares'){
             this.obj.dollars = data.data.data.data[x].total
             this.obj.total = parseFloat(this.obj.total) + parseFloat(this.convertDllToMxn(this.obj.dollars))
          }
          if(data.data.data.data[x].currency === 'Pesos'){
             this.obj.pesos = data.data.data.data[x].total
             this.obj.total = parseFloat(this.obj.total) + parseFloat(this.obj.pesos)
          }
          if(data.data.data.data[x].currency === 'Yuans'){
            this.obj.yuan = data.data.data.data[x].total
            this.obj.total = parseFloat(this.obj.total) + parseFloat(this.convertYuanesToMxn(this.obj.yuan))
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
    async getTransactions(){
      try {
        let data = await http.get('v1/summary/transactions')  
        this.data = data.data.data.data
      } catch (error) {
        console.log(error)
      }
    },
    convertYuanesToMxn(yuanes){
      return ((yuanes / this.currencies.yuan) * this.currencies.dollars)
    },
    convertDllToMxn(dlls){
      return (dlls * this.currencies.dollars)
    },
    convertBitCoinToMxn(bitcoin){
      this.currencies.bitcoins = this.currencies.bitcoins.replace(",", '');
      return ((parseFloat(bitcoin) * parseFloat(this.currencies.bitcoins))  * this.currencies.dollars)
    }
  },
  async created() {
   
    await this.getValuesUsd()
    await this.getValuesYuans()
    await this.getValueBitCoin() 
    this.getSummary()
    this.getTransactions()
  }
};
</script>
