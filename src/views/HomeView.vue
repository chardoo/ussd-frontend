<template>
  <v-container class="">
    <Welcome />
    <v-col>
          <h2>Filters</h2>
         <v-row>
          <v-col>

         
          <v-menu :close-on-content-click="false" max-width="290">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                :value="computedDateFormattedMomentjs"
                clearable
                label="Date"
                readonly
                v-bind="attrs"
                v-on="on"
                @click:clear="date = null"
              ></v-text-field>
            </template>
            <v-date-picker v-model="date"></v-date-picker>
          </v-menu>
        </v-col>
           <v-col>
            <v-btn @click="getSoulsByDate"
            
            class="mt-3 mr-2"> Search</v-btn>
           </v-col>
        </v-row>
        </v-col>
    <v-col  cols="12" class="mt-15">
              <!-- <v-app-bar
                       color="white"
                       dark
                       class="mb-2 ml-2 mr-2"
                     >
                      
                 
                       <v-toolbar-title class="primary--text"> Dashboard</v-toolbar-title> 
                       
                      
                     </v-app-bar>       -->
                <v-row dense class="v-card--material-stats mr-2 ml-2 mb-5 primary--text">
                 <v-col cols="6"
                           sm="6"
                           lg="3"
                           md="3">
                   <v-card elevation="10"  height="100" >
                       <h3 class=" ml-3 text--primary1 -red"> Total :  {{totalSouls}}</h3>  
                       <h4 class=" ml-3 text--primary1"> Female:  {{ adultFemale + childFemale+ youthFemale }}  </h4>  
                       <h4 class=" ml-3 text--primary1"> Male  : {{ adultMale + childMale+ youthMale }}</h4>  
                  </v-card> 
                </v-col>
                <v-col cols="6"
                          sm="6"
                          lg="3"
                          md="3">
                    <v-card elevation="10"  height="100">
                       <h3 class="ml-3 text--primary1">  Adults : {{ adultFemale + adultMale }}  </h3>
                       <h4 class=" ml-3 text--primary1"> Female :   {{ adultFemale }} </h4>  
                       <h4 class=" ml-3 text--primary1"> Male   :  {{ adultMale }}</h4>  
                    </v-card>
                 </v-col> 
                     <v-col cols="6"
                          sm="6"
                          lg="3"
                          md="3">
                    <v-card elevation="10"  height="100">
                       <h3 class="ml-3 text--primary1"> Youths : {{ youthFemale + youthMale }}      </h3>
                       <h4 class=" ml-3 text--primary1"> Female:  {{ youthFemale }}</h4>  
                       <h4 class=" ml-3 text--primary1"> Male  :  {{ youthMale }}</h4>  
                    </v-card>
                 </v-col> 
                 <v-col cols="6"
                          sm="6"
                          lg="3"
                          md="3">
                    <v-card elevation="10" height="100">
                              <h3 class="ml-3 text--primary1">  Children : {{ childFemale + childMale }}   </h3>
                              <h4 class=" ml-3 text--primary1"> Female   :  {{ childFemale }}</h4>  
                       <h4 class=" ml-3 text--primary1">        Male     :  {{ childMale }}</h4>  
                    </v-card>
                 </v-col> 
                 
                </v-row>
    </v-col>
    <template>
      <v-row no-gutters>
        

        <v-col cols="12" sm="12" md="12">
          <v-card class="p-64">
            <v-toolbar>
              <v-toolbar-title> Total {{ totalSouls }} </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-text-field
                clearable
                flat
                hide-details
                label="Search "
                solo-inverted
                v-model="search"
              ></v-text-field>
            </v-toolbar>
            <v-data-table
              ref="myTable"
              :headers="headers"
              :items="soul"
              :search="search"
              :items-per-page="10"
              class="elevation-1"
            >
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </v-container>
</template>

<script>
import newRequest from "@/utils/newRequest";
import Welcome from "../components/Welcome.vue";
import moment from "moment";
export default {
  name: "HomeView",
  components: {
    Welcome,
  },

  data() {
    return {
      soul: [],
      date: null,
      totalSouls: null,
      childFemale:null,
      childMale:null,
      youthFemale:null,
      youthMale:null,
      adultFemale:null,
      adultMale:null,

      headers: [
        {
          text: "Name",
          value: "name",
        },

        {
          text: "Contact",
          value: "contact",
        },
        {
          text: "Gender",
          value: "gender",
        },
        {
          text: "Town",
          value: "town",
        },
      ],
      loading: false,
      search: "",
    };
  },

  methods: {
    getSouls() {
      this.loading = true;
      newRequest.get("/souls").then((res) => {
        console.log(res);
        this.soul = [...res.data.data];
        this.totalSouls = res.data.metadata.result_set.total;
        this.adultMale =  res.data.summary.adult.male
        this.adultFemale =  res.data.summary.adult.female
        this.youthMale =  res.data.summary.youth.male
        this.youthFemale =  res.data.summary.youth.female
        this.childMale =  res.data.summary.children.male
        this.childFemale =  res.data.summary.children.female
        console.log(this.totalSouls);
      });
    },
    getSoulsByDate() {
      this.loading = true;
      
      var mydate  =  moment(this.date).format("MMM Do YY");
      newRequest.get(`/souls/${mydate}`).then((res) => {
        console.log(res);

        this.soul = [...res.data.data];
        this.totalSouls = res.data.metadata.result_set.total;
        this.adultMale =  res.data.summary.adult.male
        this.adultFemale =  res.data.summary.adult.female
        this.youthMale =  res.data.summary.youth.male
        this.youthFemale =  res.data.summary.youth.female
        this.childMale =  res.data.summary.children.male
        this.childFemale =  res.data.summary.children.female
        console.log(this.totalSouls);
      });
     
    },
    
    
  },

  mounted() {
    this.getSouls();
  },
  computed: {
    computedDateFormattedMomentjs() {
      // var me  =  moment(this.date).format()
      // print("date i snow")
      // console.log(me)
      // this.getSoulsByDate()
      return this.date ? moment(this.date).format("MMM Do YY") : "";
    },
  },
};
</script>

<style scoped>
.justForFun {
  display: flex;
  justify-content: center;
  font-size: 30px;
  margin-bottom: 20px;
  font-weight: bolder;
  color: red;
}
</style>
