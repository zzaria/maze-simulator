(this["webpackJsonpgrid-simulator"]=this["webpackJsonpgrid-simulator"]||[]).push([[0],{10:function(t,e,a){t.exports=a(18)},15:function(t,e,a){},17:function(t,e,a){},18:function(t,e,a){"use strict";a.r(e);var r=a(0),s=a.n(r),n=a(8),i=a.n(n),o=(a(15),a(1)),l=a.n(o),u=a(2),c=a(3),h=a(4),f=a(6),p=a(5),d=(a(17),a(9)),k=a.n(d),b=Math.floor(window.screen.height/25)-12,g=Math.floor(window.screen.width/25)-1;function m(t){return s.a.createElement("div",{className:"cell",style:{backgroundColor:t.color},onMouseOver:function(){return t.dragOver(0)},onMouseDown:function(){return t.dragOver(1)}})}var v=function(t){Object(f.a)(a,t);var e=Object(p.a)(a);function a(t){var r;return Object(c.a)(this,a),(r=e.call(this,t)).state={color:["white","lime","red","black","#f37fff","#bf49ff","gold"]},r}return Object(h.a)(a,[{key:"render",value:function(){for(var t=this,e=[],a=function(a){n=[];for(var r=function(e){if(t.props.grid[a][e]>=0)n.push(s.a.createElement(m,{key:a*g+e,color:t.state.color[t.props.grid[a][e]],dragOver:function(r){return t.props.dragOver(a,e,r)}}));else{for(i=Math.max(0,256-Math.floor(20*Math.log2(1-t.props.grid[a][e]))).toString(16);i.length<2;)i="0"+i;n.push(s.a.createElement(m,{key:a*g+e,color:"#"+i+i+i,dragOver:function(r){return t.props.dragOver(a,e,r)}}))}},o=0;o<g;o++)r(o);e.push(s.a.createElement("div",{key:a},n))},r=0;r<b;r++){var n,i;a(r)}return s.a.createElement("div",{onMouseDown:function(){return t.props.mousePress(1)},onMouseUp:function(){return t.props.mousePress(0)}},e)}}]),a}(s.a.Component),x=function(t){Object(f.a)(a,t);var e=Object(p.a)(a);function a(t){var r;return Object(c.a)(this,a),(r=e.call(this,t)).state={grid:Array(b).fill().map((function(){return Array(g).fill(0)})),mark:0,pressed:0,fid:0,stop:[],weight:0,algo:"bfs"},r}return Object(h.a)(a,[{key:"setVal",value:function(t,e,a){var r=this.state.grid.slice();r[t][e]=a,this.setState({grid:r})}},{key:"dragOver",value:function(t,e,a){(a||this.state.pressed)&&(this.setVal(t,e,this.state.mark),this.search(0))}},{key:"setMark",value:function(t){this.setState({mark:t})}},{key:"mousePress",value:function(t){this.setState({pressed:t})}},{key:"sleep",value:function(t){return new Promise((function(e){return setTimeout(e,t)}))}},{key:"clear",value:function(){var t=this.state.stop.slice();t[this.state.fid-1]=1,this.setState({stop:t});for(var e=0;e<b;e++)for(var a=0;a<g;a++)this.setVal(e,a,0)}},{key:"search",value:function(t){var e=this.state.stop.slice();e[this.state.fid-1]=1,this.setState({stop:e}),"bfs"==this.state.algo?this.bfs(t):"dfs"==this.state.algo?this.dfs(t):"dijkstra"==this.state.algo?this.dijkstra(t):"spfa"==this.state.algo?this.spfa(t):"astar"==this.state.algo&&this.astar(t)}},{key:"bfs",value:function(){var t=Object(u.a)(l.a.mark((function t(e){var a,r,s,n,i,o,u,c,h,f,p,d;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:for(a=[1,0,-1,0],r=[0,1,0,-1],s=Array(b).fill().map((function(){return Array(g)})),n=[],i=0,o=this.state.fid,this.setState({fid:o+1}),u=0;u<b;u++)for(c=0;c<g;c++)this.state.grid[u][c]>3?this.setVal(u,c,0):1==this.state.grid[u][c]?(s[u][c]=-1,n.push([u,c])):3==this.state.grid[u][c]&&(s[u][c]=-1);case 3:if(!(i<n.length)){t.next=31;break}if(1!=this.state.stop[o]){t.next=6;break}return t.abrupt("break",31);case 6:if(h=n[i][0],f=n[i][1],i++,2!=this.state.grid[h][f]){t.next=24;break}case 9:if(-1==s[h][f]){t.next=21;break}if(1!=this.state.stop[o]){t.next=12;break}return t.abrupt("break",21);case 12:if(5==this.state.grid[h][f]&&this.setVal(h,f,6),p=s[h][f],h-=a[p],f-=r[p],!e){t.next=19;break}return t.next=19,this.sleep(e);case 19:t.next=9;break;case 21:return t.abrupt("break",31);case 24:4==this.state.grid[h][f]&&this.setVal(h,f,5);case 25:for(d=0;d<4;d++)0<=h+a[d]&&h+a[d]<b&&0<=f+r[d]&&f+r[d]<g&&null==s[h+a[d]][f+r[d]]&&(s[h+a[d]][f+r[d]]=d,n.push([h+a[d],f+r[d]]),0==this.state.grid[h+a[d]][f+r[d]]&&this.setVal(h+a[d],f+r[d],4));if(!e){t.next=29;break}return t.next=29,this.sleep(e);case 29:t.next=3;break;case 31:case"end":return t.stop()}}),t,this)})));return function(e){return t.apply(this,arguments)}}()},{key:"dfs",value:function(){var t=Object(u.a)(l.a.mark((function t(e){var a,r,s,n,i,o,u,c,h,f,p,d;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:for(a=[1,0,-1,0],r=[0,1,0,-1],s=Array(b).fill().map((function(){return Array(g)})),n=[],0,i=this.state.fid,this.setState({fid:i+1}),o=0;o<b;o++)for(u=0;u<g;u++)this.state.grid[o][u]>3?this.setVal(o,u,0):1==this.state.grid[o][u]?(s[o][u]=-1,n.push([o,u])):3==this.state.grid[o][u]&&(s[o][u]=-1);case 3:if(!(n.length>0)){t.next=30;break}if(1!=this.state.stop[i]){t.next=6;break}return t.abrupt("break",30);case 6:if(c=n.pop(),h=c[0],f=c[1],2!=this.state.grid[h][f]){t.next=23;break}case 8:if(-1==s[h][f]){t.next=20;break}if(1!=this.state.stop[i]){t.next=11;break}return t.abrupt("break",20);case 11:if(5==this.state.grid[h][f]&&this.setVal(h,f,6),p=s[h][f],h-=a[p],f-=r[p],!e){t.next=18;break}return t.next=18,this.sleep(e);case 18:t.next=8;break;case 20:return t.abrupt("break",30);case 23:4==this.state.grid[h][f]&&this.setVal(h,f,5);case 24:for(d=0;d<4;d++)0<=h+a[d]&&h+a[d]<b&&0<=f+r[d]&&f+r[d]<g&&null==s[h+a[d]][f+r[d]]&&(s[h+a[d]][f+r[d]]=d,n.push([h+a[d],f+r[d]]),0==this.state.grid[h+a[d]][f+r[d]]&&this.setVal(h+a[d],f+r[d],4));if(!e){t.next=28;break}return t.next=28,this.sleep(e);case 28:t.next=3;break;case 30:case"end":return t.stop()}}),t,this)})));return function(e){return t.apply(this,arguments)}}()},{key:"dijkstra",value:function(){var t=Object(u.a)(l.a.mark((function t(e){var a,r,s,n,i,o,u,c,h,f,p,d,k,m;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:for(a=[1,0,-1,0],r=[0,1,0,-1],s=Array(b).fill().map((function(){return Array(g)})),n=Array(b).fill().map((function(){return Array(g).fill(1e9)})),i=[],o=this.state.fid,this.setState({fid:o+1}),u=0;u<b;u++)for(c=0;c<g;c++)this.state.grid[u][c]>3?this.setVal(u,c,0):1==this.state.grid[u][c]?(s[u][c]=-1,i.push([u,c]),n[u][c]=0):3==this.state.grid[u][c]&&(s[u][c]=-1,n[u][c]=0);case 3:if(!(i.length>0)){t.next=33;break}if(1!=this.state.stop[o]){t.next=6;break}return t.abrupt("break",33);case 6:for(h=0,f=0;f<i.length;f++)n[i[f][0]][i[f][1]]<n[i[h][0]][i[h][1]]&&(h=f);if(p=i[h][0],d=i[h][1],i.splice(h,1),2!=this.state.grid[p][d]){t.next=26;break}case 11:if(-1==s[p][d]){t.next=23;break}if(1!=this.state.stop[o]){t.next=14;break}return t.abrupt("break",23);case 14:if(5==this.state.grid[p][d]&&this.setVal(p,d,6),k=s[p][d],p-=a[k],d-=r[k],!e){t.next=21;break}return t.next=21,this.sleep(e);case 21:t.next=11;break;case 23:return t.abrupt("break",33);case 26:4==this.state.grid[p][d]&&this.setVal(p,d,5);case 27:for(m=0;m<4;m++)0<=p+a[m]&&p+a[m]<b&&0<=d+r[m]&&d+r[m]<g&&(null==s[p+a[m]][d+r[m]]&&(s[p+a[m]][d+r[m]]=m,i.push([p+a[m],d+r[m]]),0==this.state.grid[p+a[m]][d+r[m]]&&this.setVal(p+a[m],d+r[m],4)),n[p+a[m]][d+r[m]]>n[p][d]-Math.min(0,this.state.grid[p+a[m]][d+r[m]])+1&&(n[p+a[m]][d+r[m]]=n[p][d]-Math.min(0,this.state.grid[p+a[m]][d+r[m]])+1));if(!e){t.next=31;break}return t.next=31,this.sleep(e);case 31:t.next=3;break;case 33:case"end":return t.stop()}}),t,this)})));return function(e){return t.apply(this,arguments)}}()},{key:"spfa",value:function(){var t=Object(u.a)(l.a.mark((function t(e){var a,r,s,n,i,o,u,c,h,f,p,d;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:for(a=[1,0,-1,0],r=[0,1,0,-1],s=Array(b).fill().map((function(){return Array(g)})),n=Array(b).fill().map((function(){return Array(g).fill(1e9)})),i=[],o=this.state.fid,this.setState({fid:o+1}),u=0;u<b;u++)for(c=0;c<g;c++)this.state.grid[u][c]>3?this.setVal(u,c,0):1==this.state.grid[u][c]?(s[u][c]=-1,i.push([u,c]),n[u][c]=0):3==this.state.grid[u][c]&&(s[u][c]=-1,n[u][c]=0);case 3:if(!(i.length>0)){t.next=31;break}if(1!=this.state.stop[o]){t.next=6;break}return t.abrupt("break",31);case 6:if(h=i[0][0],f=i[0][1],i.splice(0,1),2!=this.state.grid[h][f]){t.next=24;break}case 9:if(-1==s[h][f]){t.next=21;break}if(1!=this.state.stop[o]){t.next=12;break}return t.abrupt("break",21);case 12:if(5==this.state.grid[h][f]&&this.setVal(h,f,6),p=s[h][f],h-=a[p],f-=r[p],!e){t.next=19;break}return t.next=19,this.sleep(e);case 19:t.next=9;break;case 21:return t.abrupt("break",31);case 24:4==this.state.grid[h][f]&&this.setVal(h,f,5);case 25:for(d=0;d<4;d++)0<=h+a[d]&&h+a[d]<b&&0<=f+r[d]&&f+r[d]<g&&n[h+a[d]][f+r[d]]>n[h][f]-Math.min(0,this.state.grid[h+a[d]][f+r[d]])+1&&(n[h+a[d]][f+r[d]]=n[h][f]-Math.min(0,this.state.grid[h+a[d]][f+r[d]])+1,s[h+a[d]][f+r[d]]=d,i.push([h+a[d],f+r[d]]),0==this.state.grid[h+a[d]][f+r[d]]&&this.setVal(h+a[d],f+r[d],4));if(!e){t.next=29;break}return t.next=29,this.sleep(e);case 29:t.next=3;break;case 31:case"end":return t.stop()}}),t,this)})));return function(e){return t.apply(this,arguments)}}()},{key:"astar",value:function(){var t=Object(u.a)(l.a.mark((function t(e){var a,r,s,n,i,o,u,c,h,f,p,d,k,m,v,x,y;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:for(a=[1,0,-1,0],r=[0,1,0,-1],s=Array(b).fill().map((function(){return Array(g)})),n=Array(b).fill().map((function(){return Array(g).fill(1e9)})),i=Array(b).fill().map((function(){return Array(g).fill(1e9)})),o=[],u=this.state.fid,this.setState({fid:u+1}),c=0;c<b;c++)for(h=0;h<g;h++)if(this.state.grid[c][h]>3)this.setVal(c,h,0);else if(1==this.state.grid[c][h])s[c][h]=-1,o.push([c,h]),n[c][h]=0;else if(2==this.state.grid[c][h])for(f=0;f<b;f++)for(p=0;p<g;p++)i[f][p]=Math.min(i[f][p],Math.abs(f-c)+Math.abs(p-h));else 3==this.state.grid[c][h]&&(s[c][h]=-1,n[c][h]=0);case 3:if(!(o.length>0)){t.next=32;break}if(1!=this.state.stop[u]){t.next=6;break}return t.abrupt("break",32);case 6:for(k=o[d=0][0],m=o[d][1],v=0;v<o.length;v++)n[o[v][0]][o[v][1]]+i[o[v][0]][o[v][1]]<=n[k][m]+i[k][m]&&(d=v,k=o[v][0],m=o[v][1]);if(o.splice(d,1),2!=this.state.grid[k][m]){t.next=25;break}case 10:if(-1==s[k][m]){t.next=22;break}if(1!=this.state.stop[u]){t.next=13;break}return t.abrupt("break",22);case 13:if(5==this.state.grid[k][m]&&this.setVal(k,m,6),x=s[k][m],k-=a[x],m-=r[x],!e){t.next=20;break}return t.next=20,this.sleep(e);case 20:t.next=10;break;case 22:return t.abrupt("break",32);case 25:4==this.state.grid[k][m]&&this.setVal(k,m,5);case 26:for(y=0;y<4;y++)0<=k+a[y]&&k+a[y]<b&&0<=m+r[y]&&m+r[y]<g&&(null==s[k+a[y]][m+r[y]]&&(s[k+a[y]][m+r[y]]=y,o.push([k+a[y],m+r[y]]),0==this.state.grid[k+a[y]][m+r[y]]&&this.setVal(k+a[y],m+r[y],4)),n[k+a[y]][m+r[y]]>n[k][m]-Math.min(0,this.state.grid[k+a[y]][m+r[y]])+1&&(n[k+a[y]][m+r[y]]=n[k][m]-Math.min(0,this.state.grid[k+a[y]][m+r[y]])+1));if(!e){t.next=30;break}return t.next=30,this.sleep(e);case 30:t.next=3;break;case 32:case"end":return t.stop()}}),t,this)})));return function(e){return t.apply(this,arguments)}}()},{key:"setWeight",value:function(t){var e=Math.max(0,Math.min(1e4,t.target.value));this.setState({weight:-e}),this.setMark(-e)}},{key:"setAlgo",value:function(t){this.setState({algo:t.target.value})}},{key:"render",value:function(){var t=this;return document.title="Aaerialys | Grid Simulator",s.a.createElement("div",null,s.a.createElement("header",null,s.a.createElement("h1",null,s.a.createElement("a",{href:"index.html"},"Grid Simulator")),s.a.createElement("a",{href:"https://aaerialys.cf"},s.a.createElement("img",{src:k.a,alt:"logo"}))),s.a.createElement("div",{className:"main"}),s.a.createElement("div",null,s.a.createElement("button",{onClick:function(){return t.setMark(3)}},"Add Wall"),s.a.createElement("button",{onClick:function(){return t.setMark(1)}},"Add Source"),s.a.createElement("button",{onClick:function(){return t.setMark(2)}},"Add Sink"),s.a.createElement("button",{onClick:function(){return t.clear()}},"Clear"),s.a.createElement("label",null,s.a.createElement("button",{onClick:function(){return t.setMark(t.state.weight)}},"Add empty cell (weighted)"),s.a.createElement("input",{type:"number",value:-this.state.weight,onChange:function(e){return t.setWeight(e)}})),s.a.createElement("label",null,s.a.createElement("button",{onClick:function(){return t.search(1)}},"Search"),s.a.createElement("select",{onChange:function(e){return t.setAlgo(e)}},s.a.createElement("option",{value:"bfs"},"bfs"),s.a.createElement("option",{value:"dfs"},"dfs"),s.a.createElement("option",{value:"dijkstra"},"dijkstra"),s.a.createElement("option",{value:"spfa"},"spfa"),s.a.createElement("option",{value:"astar"},"a*"))),s.a.createElement("p",null,"This program simulates pathfinding algorithms on a grid to find the shortest path from any source to sink."),s.a.createElement(v,{grid:this.state.grid,mousePress:function(e){return t.mousePress(e)},dragOver:function(e,a,r){return t.dragOver(e,a,r)}})),s.a.createElement("footer",null,s.a.createElement("div",{className:"bottom"},s.a.createElement("p",null,"2020 | ",s.a.createElement("a",{href:"https://aaerialys.cf"},"Aaerialys")))))}}]),a}(s.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(s.a.createElement(s.a.StrictMode,null,s.a.createElement(x,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))},9:function(t,e,a){t.exports=a.p+"static/media/logo.3ef91830.ico"}},[[10,1,2]]]);
//# sourceMappingURL=main.1ee7476e.chunk.js.map