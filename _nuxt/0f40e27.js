(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{289:function(t,o,e){var content=e(295);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,e(48).default)("707412f6",content,!0,{sourceMap:!1})},291:function(t,o,e){"use strict";var r=e(2),n=e(292);r({target:"String",proto:!0,forced:e(293)("link")},{link:function(t){return n(this,"a","href",t)}})},292:function(t,o,e){"use strict";var r=e(4),n=e(24),d=e(13),c=/"/g,l=r("".replace);t.exports=function(t,o,e,r){var f=d(n(t)),m="<"+o;return""!==e&&(m+=" "+e+'="'+l(d(r),c,"&quot;")+'"'),m+">"+f+"</"+o+">"}},293:function(t,o,e){"use strict";var r=e(3);t.exports=function(t){return r((function(){var o=""[t]('"');return o!==o.toLowerCase()||o.split('"').length>3}))}},294:function(t,o,e){"use strict";e(289)},295:function(t,o,e){var r=e(47)((function(i){return i[1]}));r.push([t.i,".product-card[data-v-17138380]{align-items:center;background-color:#fff;border:1px solid rgba(0,0,0,.1);border-radius:10px;box-shadow:0 10px 8px 0 rgba(0,0,0,.11);display:flex;flex-direction:column;width:30%}.product-card-img[data-v-17138380]{margin:30px 0;max-height:270px;overflow:hidden}h3[data-v-17138380]{font-size:32px;margin-bottom:30px;text-shadow:0 2px 8px rgba(0,0,0,.25)}.product-card-btns[data-v-17138380]{display:flex;justify-content:space-evenly;margin-bottom:20px;width:85%}.more[data-v-17138380],.product-card-btns button[data-v-17138380]{font-size:14px;padding:12px}.more[data-v-17138380]{border:none;border-radius:15px;box-shadow:inset 0 4px 4px 0 hsla(0,0%,100%,.43);color:#fff;cursor:pointer;width:calc(50% - 5px)}.more[data-v-17138380]:hover{filter:brightness(90%)}.more[data-v-17138380]:active{transform:scale(.98)}.more[data-v-17138380]{background-color:#000}",""]),r.locals={},t.exports=r},296:function(t,o,e){"use strict";e.r(o);e(291);var r=e(83),n=e(110),d={name:"ProductCard",components:{ButtonGreen:r.default,CallModal:n.default},props:{productName:{type:String,required:!0,default:""},noSlide:{type:Boolean,default:!0}},data:function(){return{link:"/catalog/".concat(this.productName),image:"/images/".concat(this.productName,".png"),visible:!1,modalFrom:""}},methods:{openModal:function(t){this.visible=!0,this.modalFrom=t}}},c=(e(294),e(22)),component=Object(c.a)(d,(function(){var t=this,o=t._self._c;return o("div",{staticClass:"product-card"},[o("div",{staticClass:"product-card-img"},[o("img",{attrs:{src:t.image,alt:t.productName}})]),t._v(" "),o("h3",[t._v(t._s(t.productName))]),t._v(" "),o("div",{staticClass:"product-card-btns"},[o("ButtonGreen",{directives:[{name:"show",rawName:"v-show",value:t.noSlide,expression:"noSlide"}],attrs:{text:"ОСТАВИТЬ ЗАЯВКУ"},on:{click:function(o){return t.openModal("form")}}}),t._v(" "),o("CallModal",{directives:[{name:"show",rawName:"v-show",value:t.visible,expression:"visible"}],attrs:{from:t.modalFrom},on:{"close-modal":function(o){t.visible=!1}}}),t._v(" "),o("nuxt-link",{staticClass:"more",attrs:{to:t.link}},[t._v("ПОДРОБНЕЕ . . .")])],1)])}),[],!1,null,"17138380",null);o.default=component.exports;installComponents(component,{ButtonGreen:e(83).default,CallModal:e(110).default})}}]);