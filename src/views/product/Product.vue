<template>
    <v-container v-if="isLoggedIn">
        <template>
          <v-row justify="center">
            <v-dialog v-model="error" persistent max-width="500">
              <v-card>
                <v-card-title class="headline deep-orange">Warning</v-card-title>
                <v-card-text>{{errorMsg}}</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="deep-orange" text @click="setErrorZero">Cancel</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            </v-row>
            </template>
            <v-alert
              v-if="!error"
              dense
              type="info"
            >
              {{errorMsg}}
            </v-alert>

        <template v-if="! indexData">
            <v-data-table item-key="name" class="elevation-1" loading loading-text="Loading... Please wait"></v-data-table>
        </template>
        <v-data-table
            :headers="headers"
            :items="indexData"
            sort-by="active"
            class="elevation-1"
        >
            <template v-slot:top>
            <v-toolbar flat color="blue dark-accent 4">
                <v-toolbar-title class="font-weight-bold">Product</v-toolbar-title>
                <v-divider
                class="mx-4"
                inset
                vertical
                ></v-divider>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                    >New Product</v-btn>
                </template>
                <v-card>
                    <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                    <v-container>
                        <v-row>
                          <v-col cols="12" sm="6" md="6">
                              <v-text-field v-model="editedItem.title" label="Title"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="6">
                              <!-- <v-textarea
                                name="input-7-1"
                                label="Description"
                                value=""
                                v-model="editedItem.description"
                                hint="description"
                              ></v-textarea> -->
                              <v-text-field v-model="editedItem.description" label="Description"></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" sm="6" md="6">
                              <v-text-field v-model="editedItem.price" label="Price"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="6">
                            <input
                                type="file"
                                
                                ref="image"
                                accept="image/*"
                                @change="onFilePicked"
                              >
                              <!-- <v-file-input accept=".png" v-model="editedItem.image" label="Image"></v-file-input> -->
                              <!-- <v-text-field v-model="editedItem.image" label="Image"></v-text-field> -->
                          </v-col>
                        </v-row>
                    </v-container>
                    </v-card-text>

                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                    </v-card-actions>
                </v-card>
                </v-dialog>
            </v-toolbar>
            </template>
            <template v-slot:item.image="{ item }">
                <img :src="getUrl + item.image" style="width: 50px; height: 50px" />
            </template>
            <template v-slot:item.actions="{ item }">
            <v-icon
                small
                class="mr-2"
                @click="editItem(item)"
            >
                mdi-pencil
            </v-icon>
            <v-icon
                small
                @click="deleteItem(item)"
            >
                mdi-delete
            </v-icon>
            </template>
            <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">Reset</v-btn>
            </template>
        </v-data-table>
    </v-container>
    <v-container v-else>
        <template>
            <div>
                <v-alert
                v-model="alert"
                dismissible
                close-icon="mdi-delete"
                color="red"
                border="left"
                elevation="2"
                colored-border
                
                >
                You are <strong>not Logged In</strong>, please log in first!.
                </v-alert>

                <div class="text-center">
                <v-btn
                    v-if="!alert"
                    dark
                    @click="alert = true"
                >
                    Reset Alert
                </v-btn>
                </div>
            </div>
        </template>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

  export default {
    data: () => ({
      dialog: false,
      apiUrl: 'product',
      alert:true,
      headers: [
        { text: 'Title', align: 'start', value: 'title'},
        { text: 'Description', value: 'description' },
        { text: 'Price', value: 'price' },
        { text: 'Image', value: 'image' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      items: [0 , 1],
      editedIndex: -1,
      editedItem: {
        title: '',
        description: '',
        price: '',
        image: '',
      },
      defaultItem: {
        title: '',
        description: '',
        price: '',
        image: '',
      },
    }),

    computed: {
        ...mapGetters(['isLoggedIn', 'indexData', 'error', 'statusCode', 'errorMsg', 'getUrl']),
      formTitle () {
        return this.editedIndex === -1 ? 'New Product' : 'Edit Product'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.$store.dispatch('setIndexData', [this.apiUrl])
      },

      setErrorZero () {
        this.$store.dispatch('setErrorZero')
      },

      editItem (item) {
        this.editedIndex = this.indexData.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.indexData.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.indexData.splice(index, 1)
        this.$store.dispatch('delete', [this.apiUrl, item.id])
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      onFilePicked (e) {
        const files = e.target.files
        if(files[0] !== undefined) {
          this.editedItem.image = files[0].name
          
          if(this.editedItem.image.lastIndexOf('.') <= 0) {
            return
          }
          const fr = new FileReader ()
          fr.readAsDataURL(files[0])
          fr.addEventListener('load', () => {
            this.editedItem.image = fr.result
            // this.editedItem.imageUrl = files[0] // this is an image file that can be sent to server...
          })
        } 
      },

      save () {
        if (this.editedIndex > -1) {
          this.$store.dispatch('store', [this.apiUrl, this.editedItem])
          // Object.assign(this.indexData[this.editedIndex], this.editedItem)
        } else {
          this.$store.dispatch('store', [this.apiUrl, this.editedItem])
          // this.indexData.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>