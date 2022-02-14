<template>
	<view>
		文字：{{text}}
		<u-button @click="back" text="跳转返回"></u-button>
		
	</view>
</template>

<script>
	export default{
		data(){
			return {
				text:'',
				show:false,
			}
		},
		onLoad(e){
			
		},
		created(){
			this.$eventHub.$on("coma",this.mes)
		},
		onShow() {
			
			
			this.show_data();
		},
		methods:{
			//全局mixin便于下拉刷新与分享
			show_data(){
				
			},
			back(){
				console.log('back')
				uni.navigateBack({
					delta:1
				})
			},
			mes(data){
				console.log("lsd",data)
				this.text=data;
			}
		}
	}
</script>

<style>
	
</style>
