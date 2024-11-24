import {
	computed,
	onMounted,
	ref
} from 'vue'

export default function useList({
	api,
	immediate = true,
	params = {}
}) {
	const pageSize = ref(20)
	const currentPage = ref(1)
	const totalCount = ref(0);
	const list = ref([]);
	const loading = ref(false)
	const noMore = ref(false)
	


	async function fetchData(refresh = false) {
		if (noMore.value) return Promise.resolve();
		try {
			loading.value = true;
			currentPage.value = refresh ? 1 : currentPage.value;
			const res = await api({
				currentPage: currentPage.value,
				pageSize: pageSize.value,
				...params
			})
			totalCount.value = res.totalCount;
			noMore.value = pageSize.value * currentPage.value >= res.totalCount;
			if (!noMore.value) {
				currentPage.value += 1;
			}
			list.value = refresh ? res.list : [...list.value, ...res.list];
		} catch (err){
			console.log('err',err)
		} finally {
			loading.value = false;
		}

	}

	onMounted(() => {
		if(immediate) {
			fetchData(true)
		}
	})


	return {
		list,
		pageSize,
		currentPage,
		totalCount,
		loading,
		fetchData,
		noMore
	}
}