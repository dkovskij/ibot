<template>
  <v-container>
    <v-row>
      <v-col>
        <div class="title">
          Стоп-лист
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            <v-row>
              <v-col sm="5" cols="12">
                <v-text-field
                  v-model="search"
                  prepend-icon="mdi-magnify"
                  label="Искать"
                />
              </v-col>
              <v-col sm="4" cols="12">
                <v-btn rounded dark color="cyan darken-3">найти</v-btn>
                <v-btn
                  class="mx-2"
                  fab
                  dark
                  small
                  color="red darken-1"
                  @click="clearSearch"
                >
                  <v-icon small>mdi-close-circle</v-icon>
                </v-btn>
              </v-col>
              <v-col sm="3" cols="12">
                <v-btn
                  rounded
                  dark
                  @click="showDialog = !showDialog"
                  color="green lighten-1"
                >
                  добавить</v-btn>
              </v-col>
            </v-row>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="phones"
            :search="search"
            :loading="loading"
            loading-text="Загрузка, пожалуйста подождите.."
            @pagination="onPagination"
            :options.sync="tableOptions"
            :footer-props="listSize"
          >
            <template v-slot:item.actions="{ item }">
              <v-icon
                small
                class="mr-2"
                @click="editPhone(item)"
              >
                mdi-pencil
              </v-icon>
              <v-icon
                small
                @click="deletePhone(item)"
              >
                mdi-delete
              </v-icon>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-dialog
        v-model="showDialog"
        persistent
        max-width="700px"
      >
        <ChangePhoneCard
          @close-dialog="showDialog = false"
        />
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
  import ChangePhoneCard from "./ChangePhoneCard";

  export default {
    name: 'List',
    components: {
      ChangePhoneCard,
    },
    data() {
      return {
        breadcrumbs: null,
        search: '',
        headers: [
          {
            text: 'Телефон',
            value: 'phone',
          },
          {
            text: 'Действия',
            value: 'actions',
            sortable: false,
            align: 'end'
          },
        ],
        showDialog: false,
        tableOptions: {
          page: this.paginationPage || 1,
          itemsPerPage: 10,
        },
        listSize: {
          'items-per-page-options': [5, 10, 15, 20, 25],
          'items-per-page-text': 'Строк на странице',
        },
      }
    },
    watch: {
      paginationPage: function(v) {
        this.tableOptions.page = v;
      }
    },
    computed: {
      phones() {
        return this.$store.state.phones;
      },
      loading() {
        return this.$store.state.loading;
      },
      paginationPage() {
        return +this.$route.params.num;
      }
    },
    created() {
      const tmp = this.$route.meta.breadCrumbs.slice();

      tmp.forEach((breadCrumb) => {
        if (breadCrumb.href === '/list/page/') {
          breadCrumb.disabled = true;
        }
      });

      this.breadcrumbs = tmp;
    },
    mounted() {
      this.tableOptions.page = +this.$route.params.num;
    },
    methods: {
      clearSearch() {
        this.search = '';
      },
      onPagination(val) {
        if (+this.$route.params.num === +val.page) {
          return;
        }
        this.$router.push('/list/page/' + val.page);
      },
      editPhone(phone) {
        this.$router.push('/edit/' + phone.id);
      },
      deletePhone(phone) {
        this.$store.dispatch('DELETE_PHONE', phone);
      }
    }
  };
</script>

<style scoped>

</style>
