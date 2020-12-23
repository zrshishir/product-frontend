<template>
  <v-app>
   <v-navigation-drawer
      v-model="drawerRight"
      app
      clipped
      right
    >
       <v-list dense v-for="(menu, i) in getMenus" :key="i">
        <v-list-item v-for="(item, index) in menu.items" :key="index" :to="item.link">
          <v-list-item-action>
            <v-icon></v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{item.title}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list dense v-if="isLoggedIn">
        <v-list-item @click="logout">
          <v-list-item-action>
            <v-icon></v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Signout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-right
      color="blue darken-4"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link color="white" to="/" tag="span" style="cursor:pointer; color:white">Product</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <div v-for="(menu, i) in getMenus" :key="i" class="text-center hidden-sm-and-down">
        <v-menu open-on-hover top offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="blue darken-4"
              dark
              v-bind="attrs"
              v-on="on"
            >
              {{menu.title}}
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              v-for="(item, index) in menu.items"
              :key="index"
              :to="item.link"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn class="hidden-sm-and-down floating" color="blue darken-4" v-if="isLoggedIn" @click="logout">
          Signout
        </v-btn>
      </div>

      <v-app-bar-nav-icon @click.stop="drawerRight = !drawerRight"></v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list dense v-for="(menu, i) in getMenus" :key="i">
        <v-list-item v-for="(item, index) in menu.items" :key="index" :to="item.link">
          <v-list-item-action>
            <v-icon></v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{item.title}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list dense v-if="isLoggedIn">
        <v-list-item @click="logout">
          <v-list-item-action>
            <v-icon></v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Signout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container
        class="fill-height"
        fluid
      >
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-navigation-drawer
      v-model="right"
      fixed
      right
      temporary
    ></v-navigation-drawer>

    <v-footer
      app
      color="blue darken-4"
      class="white--text"
    >
      <span>zrshishir@gmail.com</span>
      <v-spacer></v-spacer>
      <span>&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'App',
    data: () => ({
      drawer: false,
      drawerRight: false,
      right: false,
      left: false,
      items: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' },
      ],
    }),

    computed:{
    ...mapGetters(['isLoggedIn', 'getMenus'])
    }, 
    methods: {
      ...mapActions(['login', 'logout'])
    }
  }
</script>