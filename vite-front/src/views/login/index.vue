<template>
  <header class="header">
    <a href="#">
      <img
        class="logo"
        alt="Omnifood logo"
        src="img/logo.png"
        style="height: 80px"
      />
    </a>

    <nav class="main-nav">
      <ul class="main-nav-list">
        <li><a class="main-nav-link" href="#meals">搭配方案</a></li>
        <li><a class="main-nav-link nav-cta" href="#cta">立即购买</a></li>
      </ul>
    </nav>

    <button class="btn-mobile-nav"></button>
  </header>

  <main>
    <section class="section-hero">
      <div class="hero">
        <div class="hero-text-box">
          <h1 class="heading-primary">"运动,使我们重获新生,KEEP MOVING"</h1>
          <p class="hero-description">
            The smart 365-days-per-year exercise that will make you eat healthy
            again. Tailored to your personal tastes and nutritional needs.
          </p>
          <a href="#cta" class="btn btn--full margin-right-sm">立即开始</a>

          <a href="#how" class="btn btn--outline">探索更多 &darr;</a>
          <div class="delivered-meals">
            <p class="delivered-text"><span>250,000+</span> 运动者的选择！</p>
          </div>
        </div>
        <div class="hero-img-box">
          <picture>
            <img src="img/2.png" class="hero-img" />
          </picture>
        </div>
      </div>
    </section>

    <section class="section-meals" id="meals">
      <div class="container center-text">
        <span class="subheading">体育装备随心搭</span>
        <h2 class="heading-secondary">体育用具OR体育服装助你运动更舒心</h2>
      </div>

      <div class="container grid grid--3-cols margin-bottom-md">
        <div class="meal">
          <img src="img/sport.jpg" class="meal-img" alt="Japanese Gyozas" />
          <div class="meal-content">
            <div class="meal-tags">
              <span class="tag tag--vegetarian">器械用品</span>
            </div>
            <p class="meal-title">品牌正版</p>
            <ul class="meal-attributes">
              <li class="meal-attribute">
                <span><strong>1w+</strong> 月销</span>
              </li>
              <li class="meal-attribute">
                <span><strong>4.9</strong> 评分 (537)</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="meal">
          <img src="img/clo.jpg" class="meal-img" alt="Avocado Salad" />
          <div class="meal-content">
            <div class="meal-tags">
              <span class="tag tag--vegan">运动服装</span>
              <span class="tag tag--paleo">多种款式</span>
            </div>
            <p class="meal-title">国潮选择</p>
            <ul class="meal-attributes">
              <li class="meal-attribute">
                <span><strong>1w+</strong> 月销</span>
              </li>
              <li class="meal-attribute">
                <span><strong>4.8</strong> 评分 (441)</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="diets">
          <h3 class="heading-tertiary">NUIST体育用品优选:</h3>
          <ul class="list">
            <li class="list-item">
              <span>服装轻便透气</span>
            </li>
            <li class="list-item">
              <span>多种运动品牌供应</span>
            </li>
            <li class="list-item">
              <span>优惠折扣力度大</span>
            </li>
            <li class="list-item">
              <span>器材用品种类齐全</span>
            </li>
            <li class="list-item">
              <span>售后服务贴心全面</span>
            </li>
            <li class="list-item">
              <span>质量保证</span>
            </li>
            <li class="list-item">
              <span>具有青春动感</span>
            </li>
            <li class="list-item">
              <span>更多元的选择</span>
            </li>
            <li class="list-item">
              <span>随心搭配</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="container all-recipes">
        <a href="#" class="link">查看更多 &rarr;</a>
      </div>
    </section>

    <section class="section-cta" id="cta">
      <div class="container">
        <div class="cta">
          <div class="cta-text-box">
            <h2 class="heading-secondary">购买你的体育用品!</h2>
            <p class="cta-text">填写有关你的个人信息，这将作为登陆必备</p>

            <el-form
              ref="form"
              :rules="rules"
              class="cta-form"
              name="sign-up"
              netlify
              :model="formInline"
            >
              <div>
                <el-form-item prop="user">账号</el-form-item>
                <el-input
                  v-model="formInline.user"
                  placeholder="请输入账号"
                ></el-input>
              </div>

              <div>
                <el-form-item prop="password">密码</el-form-item>
                <el-input
                  v-model="formInline.password"
                  type="password"
                  placeholder="请输入密码"
                ></el-input>
              </div>

              <div>
                <el-select
                  v-model="value"
                  id="select-where"
                  name="select-where"
                  required
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </div>
              <el-button @click="onSubmit"> 立即登陆！ </el-button>

              <!-- <input type="checkbox" />
                <input type="number" /> -->
            </el-form>
          </div>
          <div
            class="cta-img-box"
            role="img"
            aria-label="Woman enjoying food"
          ></div>
        </div>
      </div>
    </section>
  </main>

  <footer class="footer">
    <div class="container grid grid--footer">
      <div class="address-col">
        <p class="footer-heading">联系我们</p>
        <address class="contacts">
          <p class="address">XXXXXXX NUIST in Nanjing province</p>
          <p>
            <a class="footer-link" href="tel:415-201-6370">XX热线:54462xxx</a
            ><br />
            <a class="footer-link" href="mailto:2734093367@qq.com"
              >2734093367@qq.com</a
            >
          </p>
        </address>
      </div>

      <nav class="nav-col">
        <p class="footer-heading">关于我们</p>
        <ul class="footer-nav">
          <li><a class="footer-link" href="#">博客地址</a></li>
          <li><a class="footer-link" href="#">隐私性+安全性</a></li>
          <li><a class="footer-link" href="#">官方商城</a></li>
          <li><a class="footer-link" href="#">可持续发展</a></li>
        </ul>
      </nav>

      <nav class="nav-col">
        <p class="footer-heading">赞助</p>
        <ul class="footer-nav">
          <li><a class="footer-link" href="#">成为赞助者</a></li>
          <li><a class="footer-link" href="#">新闻中心</a></li>
          <li><a class="footer-link" href="#">专属文档</a></li>
        </ul>
      </nav>

      <nav class="nav-col">
        <p class="footer-heading">招聘</p>
        <ul class="footer-nav">
          <li><a class="footer-link" href="#">使用条款 </a></li>
        </ul>
      </nav>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { FormItemRule, FormInstance, ElMessage } from "element-plus";
import { Rule } from "async-validator";
import { getLogin, Data } from "@/api/login";
import { useMainStore } from "@/store";
const router = useRouter();
const store = useMainStore();
type From = {
  user: string;
  password: string;
};
type Rules = {
  [K in keyof From]?: Array<FormItemRule>;
};
const formInline = reactive<From>({
  user: "",
  password: "",
});
const value = ref("");
const form = ref<FormInstance>();
const rules = reactive<Rules>({
  user: [
    {
      required: true,
      message: "请重新输入",
      type: "string",
    },
  ],
  password: [
    {
      required: true,
      message: "请重新输入",
      type: "string",
    },
  ],
});
type Res = {
  code: number;
  message: string;
  token: string;
};
const onSubmit = () => {
  form.value?.validate((validate) => {
    if (validate) {
      // router.push("/");
      // localStorage.setItem("token", "1");
      store.login(formInline).then((res) => {
        console.log(res);
        const { data } = res;
        console.log(data.code);
        if (data.code == 1000) {
          localStorage.setItem("token", data.token);
          router.push("/");
        } else if (data.code == 2000) {
          ElMessage.error("账号或密码输入错误！");
        }
      });
    } else {
      ElMessage.error("请重新输入！");
    }
  });
};

const options = [
  {
    value: "",
    label: "您从哪里了解到我们(非必选)",
  },
  {
    value: "friends",
    label: "朋友",
  },
  {
    value: "video",
    label: "B站",
  },
  {
    value: "Opodcast",
    label: "贴吧",
  },
  {
    value: "ad",
    label: "广告",
  },
  {
    value: "others",
    label: "其他",
  },
];
</script>

<style scoped>
@import "/public/css/general.css";
@import "/public/css/queries.css";
@import "/public/css/style.css";
</style>
