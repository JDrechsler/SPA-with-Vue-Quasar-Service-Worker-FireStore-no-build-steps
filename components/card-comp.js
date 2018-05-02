export const cardComp = Vue.component('card-comp', {
	props: ['propbiller'],
	data() {
		return {
			count: 0,
			stars: 0
		}
	},
	methods: {
		getPriceClass() {
			return {
				'isPaid': this.propbiller.isPaid,
				'isNotPaid': !this.propbiller.isPaid
			}
		}
	},
	template: `
		<q-card >
			<div class="card-biller-due">
				{{propbiller.dayOfMonth}}
			</div>
			<div class="card-biller-image">
				<img :src="propbiller.imageUrl" />
			</div>
			<div class="card-biller-title">
				{{propbiller.title}}
			</div>
			<div class="card-biller-price" :class='getPriceClass()'>
				<span>$</span>{{propbiller.amount}}
			</div>
		</q-card>
`
})
