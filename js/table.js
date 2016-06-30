function jstable(label, conf) {
	
	// rows contains all rows in the table 
	window.rows = new Array();
	// searching result
	window.searchResult = new Array();
	// seaching words
	window.keywords = '';
	// number of rows per page
	window.perpage = conf['perpage'];
	// current page no.
	window.curpage = 0;

	if (jQuery(label).is('table')) {
		// main
		var tbody = jQuery(label).find('tbody');
		rows = tbody.children();
		var total = rows.length;
		// fill the table and other label
		tbody.html(getPage(curpage));
		jQuery(conf['total']).text(Math.ceil(total/perpage));
		jQuery(conf['current']).text(curpage+1);
		// pre button 上一页
		jQuery(conf['previous']).click(function(){
			
			if (curpage>0){
				curpage -= 1;
				tbody.html(getPage(curpage));
				jQuery(conf['current']).text(curpage+1);
			}
			
		});
		// next button 下一页
		jQuery(conf['next']).click(function(){
			
			if (curpage<total/perpage-1){
				curpage += 1;
				tbody.html(getPage(curpage));
				jQuery(conf['current']).text(curpage+1);
			}
			
		});
		// search input 监控输入 返回查询结果
		jQuery(conf['search']).bind('input propertychange',function(){
			tbody.empty();
			searchResult = [];
			keywords = jQuery(this).val();
			if (keywords!=''){

				rows.each(function(index){
				search(index, this);
				});
				
				tbody.append(searchResult);
			} else {
				tbody.html(getPage(curpage));
			}
			
		});

	};

};



function getPage(page) {
	// return the rows by asked page no
	return rows.slice(page*perpage, (page+1)*perpage);

}

function search(index, element) {

	if (jQuery(element).text().toLowerCase().search(keywords)>=0){
		searchResult.push(element);
	};
}

