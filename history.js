const load = (component) => { 
	return window.httpVueLoader('components/' + component + '.vue')
}

const vm = new window.Vue({

	el: '#app',

	components: {
		'mood-button': load('mood-button'),
	},

	data() {
		return {
			filter: '?since=1 hour ago',
			entries: [],
			url: config.apiURL || 'http://localhost',
		}
	},

	methods: {

		getMoodHistory() {
			let root = this
			axios.get(this.url + '/' + this.filter).then((response) => {
				console.log('Mood history', response.data)
				root.entries = response.data
			})
		},

	},

	created() {

		this.getMoodHistory()

	}

})