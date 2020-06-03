<template>
	<div class="mood" @click="postMood()">
		<i v-bind:class="currentIcon"></i>
	</div>
</template>

<script>
module.exports = {

	props: {
		mood: {
			default: 'neutral',
		},
		url: {
			default: config.apiURL || 'http://localhost'
		},
	},

	data: function () {
		return {
			currentIcon: 'fa fa-5x fa-question-circle-o color-info',
			sadIcon: 'fa fa-5x fa-frown-o color-sad',
			neutralIcon: 'fa fa-5x fa-meh-o color-neutral',
			happyIcon: 'fa fa-5x fa-smile-o color-happy',
			loadingIcon: 'fa fa-5x fa-spinner fa-pulse'
		}
	},

	methods: {
		postMood: function () {
			let root = this
			let previousIcon = this.currentIcon

			this.currentIcon = this.loadingIcon

			axios.post(this.url, {
				mood: this.mood
			}).then((response) => {
				console.log('OK:', response)
				root.currentIcon = previousIcon
			}).catch((response) => {
				console.log('ERROR:', response)
			})
		}
	},

	created () {
		if (this.mood == 'sad') 	this.currentIcon = this.sadIcon
		if (this.mood == 'neutral') this.currentIcon = this.neutralIcon
		if (this.mood == 'happy') 	this.currentIcon = this.happyIcon
	},

}
</script>

<style scoped>
.mood {
	width: 100px;
	height: 80px;
	cursor: pointer;
	padding: 10px;
	border: 1px solid silver;
	border-radius: 5%;
	text-align:center;
	display:inline-block;
	background-color:white;
}
.mood:not(:last-child) {
	margin-right:10px;
}
.color-info 	{ color: blue; }
.color-sad 		{ color: red; }
.color-neutral 	{ color: grey; }
.color-happy 	{ color: green; }
</style>