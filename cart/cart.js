//获取购物车的信息
var getcart = function(){
	var xlq_sch = localStorage.getItem('xlq_sch');
	// 获取位置
	var school = JSON.parse(xlq_sch);
	// 学校ID
	var sch_id = school.sch_id;
	var xlq_cart = localStorage.getItem('xlq_cart_'+sch_id);
	// 读取购物车的资料
	var cart = JSON.parse(xlq_cart);
	return cart;
}
// 删除确认跳出浮动窗口动画
var del = function(goods){
	// 跳出动画
	var win = document.getElementsByClassName('win')[0];
	var winBox = document.getElementsByClassName('win_box')[0];
	win.style.display ='block';
	winBox.className = 'win_box jumpOut';
	
	// 截取传值过来的goods_id-goods_price
	var goods_id = goods.substr(0, goods.indexOf('-'));
	var goods_price = goods.substr(goods.indexOf('-')+1, goods.length);
	// console.log(goods_price);
	var submit = document.getElementsByClassName('submit')[0];
	submit.setAttribute('id',goods_id+"-"+goods_price);
}
// 点击浮动窗口确认删去商品
var del_goods = function(goods){
	// 截取传值过来的goods_id-goods_price
	var goods_id = goods.substr(0, goods.indexOf('-'));
	var goods_price = goods.substr(goods.indexOf('-')+1, goods.length);
	
	//获得DOM的li对象
	var delgoods = document.getElementById(goods_id);

	// 判断商品数量为0的时候调出购物车空空的窗口
	if (buy === Number(0)) {
		var cart_empty = document.getElementsByClassName('cart_empty')[0];
		var h = window.screen.availHeight-94;
		cart_empty.style.height = h+"px";
		cart_empty.style.display = 'block';
	};

	// 获取购物车的信息的方法
	getcart();
	// console.log(goods_id);
	var cartgoods = cart.goods;
	// 总的商品数量
	var newtotal = cart.total; 
	// console.log(newtotal);
	// 遍历找到对应的商品
	for (var i = 0; i < cartgoods.length; i++) {
		if (cartgoods[i].id == goods_id) {
			var jiunum = cartgoods[i].num;
			// 删去该数组
			cartgoods.splice(i,1);
			// console.log(cartgoods);
			break;
		}else{
			continue;
		};
	};

	// 减去去下单的商品总数量
	var buy_num = document.getElementById('buy_num');
	var buy = buy_num.innerText;
	buy_num.innerHTML = buy - jiunum;

	// console.log(cartgoods);
	// 总价对象
	var tolprice = document.getElementById('tolprice');
	// 总价的内容
	var tprice = tolprice.innerText;

	// 总价钱
	var tosum = (Number(tprice)-Number(goods_price*jiunum)).toFixed(2);
	if (cartgoods.length == 0) {
		// 删除对象存储
		localStorage.removeItem('xlq_cart_'+sch_id);
		// 出现空购物车
		var cart_empty = document.getElementsByClassName('cart_empty')[0];
		var h = window.screen.availHeight-94;
		cart_empty.style.height = h+"px";
		cart_empty.style.display = 'block';

	}else{
		//重新生成
		var newcart = new Object;
	    newcart.sum = tosum;
	    newcart.total = buy_num.innerHTML;
	    newcart.goods = cartgoods;
	    var str = JSON.stringify(newcart);
	    localStorage.setItem('xlq_cart_'+sch_id,str);
	};

	// 减去总价对象
	var tolprice = document.getElementById('tolprice');
	// 删去该商品的全部数量
	var n =document.getElementById('goodsnum'+goods_id).innerText;

	tolprice.innerHTML = tosum;

	//获得商品的盒子
	var goods = document.getElementsByClassName('goods')[0];
	// 删去选中的商品
	goods.getElementsByTagName('ul')[0].removeChild(delgoods);
}

// 点击浮动窗口取消删去商品
var cancel = function(){
	var win = document.getElementsByClassName('win')[0];
	win.style.display ='none';
}

// 减少商品数量
var reduce = function(goods){
	// 截取传值过来的goods_id-goods_price
	var goods_id = goods.substr(0, goods.indexOf('-'));
	var goods_price = goods.substr(goods.indexOf('-')+1, goods.length);

	// 获取该商品的数量
	var num =document.getElementById('goodsnum'+goods_id);
	var n = num.innerHTML;
	
	if (n == 1) {
		// 判断为1的时候直接删除该商品
		del(goods);
	}else{

		// 总的购买数量
		var buy_num = document.getElementById('buy_num').innerHTML;
		// alert(buy_num);
		buy_num = --buy_num;

		// 获取购物车的信息的方法
		getcart();

		// console.log(cart);
		var cartgoods = cart.goods;
		var newtotal = cart.total; 
		// console.log(newtotal);
		for (var i = 0; i < cartgoods.length; i++) {
			if (cartgoods[i].id == goods_id) {
				// console.log(goods_id);
				var goodes = new Array;
				goodes[i] = {id:goods_id,num: Number(cartgoods[i].num)-1, price:price};
				// 删去该数组，后面重新合并
				cartgoods.splice(i,1);
				// console.log(goodes);
				break;
			}else{
				continue;
			};
		};

		// 将数组 goodes 插入 cartgoods
		for (var i=0; i < goodes.length; i++) {
			// 为空的时候不合并数组
			if (goodes[i]) {
				cartgoods.push(goodes[i]);
			}else{
				continue;
			};
		}
		// console.log(cartgoods);
		// 总价对象
		var tolprice = document.getElementById('tolprice');
		// 总价的内容
		var tprice = tolprice.innerText;
		// 商品数量
		num.innerHTML = --n;
		// 总价钱
		var tosum = (Number(tprice)-Number(goods_price)).toFixed(2);
		//重新生成
		var newcart = new Object;
        newcart.sum = tosum;
        newcart.total = buy_num;
        newcart.goods = cartgoods;
        var str = JSON.stringify(newcart);
        localStorage.setItem('xlq_cart_'+sch_id,str);

		// 减去该商品的总价钱
		tolprice.innerHTML = tosum;
		// 总的购买数量-1
		document.getElementById('buy_num').innerHTML--;
		
	}

}
// 增加商品数量
var add = function(goods){
	// 截取传值过来的goods_id-goods_price
	var goods_id = goods.substr(0, goods.indexOf('-'));
	// console.log(goods_id);
	var gid = goods_id.substring(2,0);
	// console.log(gid);
	if (gid == 'a_') {
		msg('小主，该类商品只能购买一件哟');
		return false;
	}
	if (gid == 'Y_') {
		msg('小主，该类商品只能购买一件哟');
		return false;
	}
	var goods_price = goods.substr(goods.indexOf('-')+1, goods.length);

	// 获取该商品的数量
	var num =document.getElementById('goodsnum'+goods_id);
	var n = num.innerHTML;

	// console.log(n);
	// 最大数量的获取
	var maxnum = num.getAttribute('data-maxnum'); 
	// console.log(maxnum);
	// 判断为最大的时候不可以添加
	if (Number(n) >= Number(maxnum)) {
		msg('小主,该商品达到最大库存了哟！');
	}else{
		// 执行修改本地缓存

		// 总的购买数量
		var buy_num = document.getElementById('buy_num').innerHTML;
		// alert(buy_num);
		buy_num = Number(buy_num)+1;
		// console.log(buy_num);

		// 获取购物车的信息的方法
		getcart();

		// console.log(cart);
		var cartgoods = cart.goods;
		var newtotal = cart.total; 
		// console.log(newtotal);
		for (var i = 0; i < cartgoods.length; i++) {
			if (cartgoods[i].id == goods_id) {
				// console.log(goods_id);
				var goodes = new Array;
				goodes[i] = {id:goods_id,num: Number(cartgoods[i].num)+1, price:price};
				// 删去该数组，后面重新合并
				cartgoods.splice(i,1);
				// console.log(goodes);
				break;
			}else{
				continue;
			};
		};

		// 将数组 goodes 插入 cartgoods
		for (var i=0; i < goodes.length; i++) {
			// 为空的时候不合并数组
			if (goodes[i]) {
				cartgoods.push(goodes[i]);
			}else{
				continue;
			};
		}
		// console.log(cartgoods);
		// 总价对象
		var tolprice = document.getElementById('tolprice');
		// 总价的内容
		var tprice = tolprice.innerText;
		// 商品数量
		num.innerHTML = Number(n)+1;
		// 总价钱
		var tosum = (Number(tprice)+Number(goods_price)).toFixed(2);

		//重新生成
		var newcart = new Object;
        newcart.sum = tosum;
        newcart.total = buy_num;
        newcart.goods = cartgoods;
        var str = JSON.stringify(newcart);
        localStorage.setItem('xlq_cart_'+sch_id,str);


		// 总价对象
		var tolprice = document.getElementById('tolprice');

		// 增加该商品的总价钱
		tolprice.innerHTML = tosum;

		document.getElementById('buy_num').innerHTML++;
	};

}

