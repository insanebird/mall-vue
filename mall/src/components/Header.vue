<template>
  <div style="width:900px;margin:auto;margin-top:10px;">
    <el-row>
      <el-col :span="10" class="model">
        <div style="display: flex;justify-content: flex-start;">
          <el-autocomplete
            v-model="key"
            placeholder="请输入内容"
            style="width:300px;"
            :fetch-suggestions="querySearchAsync"
            class="inline-input"
            @select="handleSelect"
          >
            <template slot-scope="{ item }">
              <el-tag type="primary" style="margin-bottom:5px;">{{ item.skuName }}</el-tag>
              <br />
            </template>
          </el-autocomplete>
          <el-button slot="append" type="info" @click="searchByName">搜索</el-button>
        </div>
      </el-col>
      <el-col :span="2">
        <el-badge :value="this.$store.state.cartNum">
          <el-button class="el-icon-shopping-cart-full" @click="getCartList"></el-button>
        </el-badge>
      </el-col>
      <el-col :span="12" class="model" style="margin-top:5px;">
        <ul>
          <li>
            <el-link type="info" @click="toIndex">首页</el-link>
          </li>
          <li>
            <el-link type="info" @click="signIn" v-if="this.$store.state.user==''">您好，请登录</el-link>
            <el-image
              :src="this.$store.state.user.image"
              style="width:30px;height:30px;"
              v-if="this.$store.state.user!=''"
            ></el-image>
            <i class="el-icon-position" v-if="this.$store.state.user.identity==1"></i>
            <a
              href="#"
              @click="changeVisible"
              v-if="this.$store.state.user!=''"
            >{{this.$store.state.user.name}}</a>
          </li>
          <li>
            <el-link type="success" @click="signUp" v-if="this.$store.state.user==''">注册</el-link>
            <el-link type="success" @click="myShop" v-if="this.$store.state.user.isRetailer==1">我的店铺</el-link>
          </li>
          <li>
            <el-link type="success" @click="myOrder">我的订单</el-link>
          </li>
          <li>
            <el-link type="success" @click="toBeVIP" v-if="this.$store.state.user.id==0">成为会员</el-link>
          </li>
          <li>
            <el-link type="success" @click="forum" v-if="this.$store.state.user.identity==1">论坛</el-link>
          </li>
          <li>
            <el-button type="primary" v-if="this.$store.state.user.isAdmin==1" @click="console">控制台</el-button>
          </li>
          <li>
            <el-link
              type="success"
              @click="toBeRetailer"
              v-if="this.$store.state.user.isRetailer==0"
            >成为商家</el-link>
          </li>
          <li>
            <el-link type="success" @click="logout">注销</el-link>
          </li>
          <li>
            <el-link type="success" @click="back">返回</el-link>
          </li>
        </ul>
      </el-col>
    </el-row>
    <el-dialog title="个人资料" :visible.sync="userInformationVisible" width="30%">
      <el-form :model="user">
        <el-form-item label="用户名">
          <el-input v-model="user.name" suffix-icon="el-icon-edit"></el-input>
        </el-form-item>
        <Upload action="http://localhost:8081/mall/upload" name="file" :on-success="handleSuccess">
          <Button icon="ios-cloud-upload-outline">头像</Button>
        </Upload>
        <el-button type="primary" @click="changePasswordStatus">修改密码</el-button>
        <el-button type="primary" @click="changeUserInformation">提交</el-button>
      </el-form>
    </el-dialog>
    <el-dialog title="修改密码" :visible.sync="changePassword" width="30%">
      <el-form :model="form" :rules="rules" status-icon>
        <el-form-item label="原始密码" prop="originalPassword">
          <el-input v-model="form.originalPassword" type="password"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input v-model="form.newPassword" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="surePassword">
          <el-input v-model="form.surePassword" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="changePasswordFunction">确认</el-button>
          <el-button type="danger" @click="hiddenPanel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    var checkPassword = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("原始密码不能为空"));
      }
      setTimeout(async () => {
        var flag = true;
        await this.$http
          .post("/checkPassword", {
            id: this.$store.state.user.id,
            password: value
          })
          .then(result => {
            flag = result.data;
          });
        if (flag == false) {
          return callback(new Error("原始密码错误"));
        } else {
          return callback();
        }
      }, 1000);
    };
    var surePassword = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("确认密码不能为空"));
      }
      if (this.form.newPassword != value) {
        return callback(new Error("两次输入密码不一致"));
      }
      return callback();
    };
    return {
      key: "",
      data: [],
      state: "",
      timeout: null,
      user: {
        name: this.$store.state.user.name,
        image: ""
      },
      userInformationVisible: false,
      changePassword: false,
      form: {
        originalPassword: "",
        newPassword: "",
        surePassword: ""
      },
      rules: {
        originalPassword: [{ validator: checkPassword, trigger: "blur" }],
        surePassword: [{ validator: surePassword, trigger: "blur" }]
      }
    };
  },
  methods: {
    getCartList: function() {
      this.$router.push("/cartList");
    },
    myOrder: function() {
      this.$router.push("/orderList");
    },
    signUp: function() {
      this.$router.push("/signUp");
    },
    signIn: function() {
      this.$router.push("/signIn");
    },
    toBeVIP: function() {
      this.$http
        .post("/toBeVIP", { id: this.$store.state.user.id })
        .then(result => {
          this.$message("恭喜您成为我们的会员");
          this.$store.state.user = result.data;
        });
    },
    toBeRetailer: function() {
      this.$router.push("/becomeRetailer");
    },
    myShop: function() {
      this.$http
        .post("/getRetailerByFounder", { founder: this.$store.state.user.id })
        .then(result => {
          this.$store.state.retailer = result.data;
        });
      this.$router.push("/myShop");
    },
    toIndex: function() {
      this.$router.push("/");
    },
    logout: function() {
      this.$store.state.user = "";
      this.$store.state.retailer = "";
      this.$http.get("/logout").then(result => {
        this.$router.push("/");
        this.$message("注销成功");
      });
    },
    back: function() {
      this.$router.go(-1);
    },
    forum: function() {
      this.$router.push("/forum");
    },
    querySearchAsync(queryString, cb) {
      this.$http.post("/getSKUByName", { skuName: this.key }).then(result => {
        this.data = result.data;
        var restaurants = this.data;
        var results = queryString
          ? restaurants.filter(this.createStateFilter(queryString))
          : restaurants;
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 1000 * Math.random());
      });
    },
    createStateFilter(queryString) {
      return state => {
        return (
          state.skuName.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    handleSelect(item) {
      this.key = item.skuName;
    },
    searchByName: function() {
      this.$router.push("/searchProduct");
      this.$http.post("/getSKUByName", { skuName: this.key }).then(result => {
        this.$store.state.products = result.data;
      });
    },
    changeVisible: function() {
      this.userInformationVisible = true;
    },
    handleSuccess: function(response, file, fileList) {
      this.user.image = response;
    },
    changePasswordStatus: function() {
      this.changePassword = true;
    },
    changePasswordFunction: function() {
      this.$http
        .post("/changePassword", {
          id: this.$store.state.user.id,
          password: this.form.newPassword
        })
        .then(result => {
          this.$message("修改成功");
          this.changePassword = false;
        });
    },
    changeUserInformation: function() {
      this.$http
        .post("/changeUserInformation", {
          id: this.$store.state.user.id,
          name: this.user.name,
          image: this.user.image
        })
        .then(result => {
          this.$store.state.user = result.data;
          this.userInformationVisible = false;
        });
    },
    console: function() {
      this.$router.push("/admin");
    },
    hiddenPanel: function() {
      this.changePassword = false;
    }
  },
  created() {
    let cookie = this.$cookies.get("cart");
    if (cookie != null)
      this.$store.state.cartNum = cookie.split("#").length - 1;
  }
};
</script>
<style>
li {
  display: inline;
  list-style: none;
  margin-right: 10px;
}

ul {
  padding: 0;
}

.model {
  text-align: center;
  height: 50px;
  text-align: center;
}
</style>
