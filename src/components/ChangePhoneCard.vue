<template>
  <v-card>
    <v-card-title>
      {{ title }} телефон
    </v-card-title>
    <v-form
      v-model="valid"
      @submit.prevent
    >
      <v-card-text>
        <v-row>
          <v-col cols="10">
            <v-text-field
              label="Телефон"
              v-model="newPhone"
              :rules="phoneRules"
            ></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-btn
              color="primary"
              fab
              x-small
              dark
              @click="changePhone"
            >
              <v-icon>mdi-check</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-form>
    <v-card-actions>
      <v-btn
        rounded
        small
        @click="closeDialog"
        :loading="loading"
      >
        Назад
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    name: "ChangePhoneCard",
    data: () => ({
      valid: false,
      phoneRules: [
        value => !!+value || 'Допускаются только цифры',
        value => {
          const pattern = /^79\d*$/;
          return pattern.test(value) || 'Неверный формат телефона (79**********)';
        },
        value => (value || '').length === 11 || 'Телефон должен содержать 11 цифр',
      ],
      newPhone: ''
    }),
    computed: {
      loading() {
        return this.$store.state.loading;
      },
      phones() {
        return this.$store.state.phones;
      },
      title() {
        let str = '';
        if (/edit/g.test(this.$route.path)) {
          str = 'Редактировать';
        } else {
          str = 'Добавить';
        }

        return str;
      }
    },
    mounted() {
      if (this.$route.params.id) {
        this.phones.forEach((phone) => {
          if (phone.id === +this.$route.params.id) {
            this.newPhone = phone.phone;
          }
        })
      }
    },
    methods: {
      changePhone() {
        let payload = {
          phone: this.newPhone,
          id: this.$route.params.id || null,
        };

        if (this.valid) {
          this.$store.dispatch('CHANGE_PHONE', payload);
          this.$store.dispatch('GET_PHONES');
          if (this.title === 'Редактировать') {
            this.$router.go(-1);
          } else {
            this.closeDialog();
          }
        }
      },
      closeDialog() {
        this.newPhone = '';
        if (this.title === 'Редактировать') {
          this.$router.go(-1);
        } else {
          this.$emit('close-dialog');
        }
      },
    }
  }
</script>

<style scoped>

</style>
