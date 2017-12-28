function orgTableBuilder(node, namespace, entity) {

	IEvent.call(this);
	var self = this,
		tableId = namespace + "Table";

	var renderNode = function(data) {
		var str = "";

		$.each(data, function(i, item) {
			str += '<tr data-id="' + item.id + '">' +
				'<td>' + item.name + '</td>' +
				'<td>' + item.code + '</td>' +
				'<td><a href="#" id="nodeManage" title="下级管理"><i class="ion-plus-round"></i></a></td>' +
				'</tr>';
		});
		return str;
	};

	var loadHtml = function(data) {
		return renderNode(data);
	};

	var getURLParameter = function(name) {
		return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
	};

	var breadcrumb = function() {
		var parentId = getURLParameter('parentId'),
			html = '';
		if(parentId == '0') {
			X.get(entity.url + '?id=' + parentId, function(respText) {
				var resp = JSON.parse(respText);
				if(resp.code == '0') {
					html += '<li><a href="#">组织架构</a></li>';
					html += '<li><a href="#">' + resp.nam + '</a></li>';
				};
			});
		} else {
			X.get(entity.url + '?id=' + parentId, function(respText) {
				var resp = JSON.parse(respText);
				if(resp.code == '0') {
					html += '<li class="active">' + resp.name + '</li>';
					$("#breadcrumb").append(html);
				};
			});
		}
		$("#breadcrumb").html(html);
	};

	this.add = function(parentId) {
		if(parentId && parentId >= 0) {
			$('#btn-add').click(function() {
				self.hi('btn-add', parentId);
			});
		} else {
			$('#btn-add').click(function() {
				self.hi('btn-add-first');
			});
		}
	};

	this.load = function(parentId) {
		if(parentId == undefined && parentId < 0 || parentId == null) {
			parentId = -1;
		};
		X.get(entity.url + '/sel?parentId=' + parentId, function(respText) {
			var resp = JSON.parse(respText);
			if(resp.data) {
				var html = loadHtml(resp.data);
				$('#' + tableId + ' tbody').html(html);
				nodeManage();
			} else {
				X.warn("加载数据失敗");
			}
		});
	};

	var nodeManage = function() {
		X("nodeManage").onclick = function(e) {
			e.preventDefault();
			var parentId = $(this).closest("tr").data("id");
		};
	};

	this.init = function() {
		self.load();
		self.add();
	};
};
(function() {
	var Super = function() {};
	Super.prototype = IEvent.prototype;
	orgTableBuilder.prototype = new Super();
})();