import { cardComp } from "./components/card-comp.js";

var config = {
	apiKey: "AIzaSyCJXGDc2kvyJSOSzu_hvhS64sHDnyKn_qE",
	authDomain: "billersapp.firebaseapp.com",
	databaseURL: "https://billersapp.firebaseio.com",
	projectId: "billersapp",
	storageBucket: "billersapp.appspot.com",
	messagingSenderId: "5384173140"
}

firebase.initializeApp(config);

var home = new Vue({
	el: '#app',
	components: {
		cardComp
	},
	firestore() {
		return {
			billers: firebase.firestore().collection("billers").orderBy('dayOfMonth', 'asc')
		}
	},
	data: {
		message: 'Vuefire & Firestore',
		initialLoading: true
	},
	methods: {
		created() {
			this.initialLoading = false
		},
		addBiller() {
			console.log('adding test biller')
			this.$firestore.billers.add({
				title: "Test new",
				amount: 0,
				isPaid: false,
				dayOfMonth: 2,
				imageUrl: ""
			})
		},
		deleteBiller(biller) {
			this.$firestore.billers.doc(biller['.key']).delete()
		},
		presentAddModal() {

		},
		presentMoneyOverviewModal() {

		}
	},
	template: `
		<q-layout view="hHr LpR lFf">
			<q-layout-header>
				<q-toolbar>
					<q-toolbar-title>
						Bill Tracker
					</q-toolbar-title>
				</q-toolbar>
			</q-layout-header>

			<q-page-container class='scroll-content'>
				<q-page >
					<div v-if='billers.length > 0'>
						
						<!-- unpaid bills -->
						<div v-for="biller in billers">
							<div v-if='!biller.isPaid'>
								<card-comp :propbiller="biller"></card-comp>
							</div>
						</div>

						<hr>

						<!-- paid bills -->
						<div v-for="biller in billers">
							<div v-if='biller.isPaid'>
								<card-comp :propbiller="biller"></card-comp>
							</div>
						</div>


					</div>
					<div v-else>
						No bills to show right now.
					</div>
				</q-page>
			</q-page-container>
		</q-layout>
	`
})



