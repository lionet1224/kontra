!function(i){i.quadtree=function(t){var s=Object.create(i.quadtree.prototype);return s._init(t),s},i.quadtree.prototype={_init:function(t){t=t||{},this.maxDepth=t.maxDepth||3,this.maxObjects=t.maxObjects||25,this._branch=!1,this._depth=t.depth||0,this._parent=t.parent,this.bounds=t.bounds||{x:0,y:0,width:i.canvas.width,height:i.canvas.height},this.objects=[],this.subnodes=[]},clear:function(){if(this._branch)for(var t=0;t<4;t++)this.subnodes[t].clear();this._branch=!1,this.objects.length=0},get:function(t){for(var s,h,i=[];this.subnodes.length&&this._branch;){for(s=this._getIndex(t),h=0;h<s.length;h++)i.push.apply(i,this.subnodes[s[h]].get(t));return i}return this.objects},add:function(){var t,s,h,i;for(s=0;s<arguments.length;s++)if(h=arguments[s],Array.isArray(h))this.add.apply(this,h);else if(this.subnodes.length&&this._branch)this._add2Sub(h);else if(this.objects.push(h),this.objects.length>this.maxObjects&&this._depth<this.maxDepth){for(this._split(),t=0;i=this.objects[t];t++)this._add2Sub(i);this.objects.length=0}},_add2Sub:function(t){var s,h=this._getIndex(t);for(s=0;s<h.length;s++)this.subnodes[h[s]].add(t)},_getIndex:function(t){var s=[],h=this.bounds.x+this.bounds.width/2,i=this.bounds.y+this.bounds.height/2,e=t.y<i&&t.y+t.height>=this.bounds.y,n=t.y+t.height>=i&&t.y<this.bounds.y+this.bounds.height;return t.x<h&&t.x+t.width>=this.bounds.x&&(e&&s.push(0),n&&s.push(2)),t.x+t.width>=h&&t.x<this.bounds.x+this.bounds.width&&(e&&s.push(1),n&&s.push(3)),s},_split:function(){if(this._branch=!0,!this.subnodes.length)for(var t=this.bounds.width/2|0,s=this.bounds.height/2|0,h=0;h<4;h++)this.subnodes[h]=i.quadtree({bounds:{x:this.bounds.x+(h%2==1?t:0),y:this.bounds.y+(2<=h?s:0),width:t,height:s},depth:this._depth+1,maxDepth:this.maxDepth,maxObjects:this.maxObjects,parent:this})}}}(kontra);