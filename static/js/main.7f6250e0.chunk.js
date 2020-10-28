(this["webpackJsonpgrid-simulator"]=this["webpackJsonpgrid-simulator"]||[]).push([[0],{10:function(t,e,a){t.exports=a(18)},15:function(t,e,a){},17:function(t,e,a){},18:function(t,e,a){"use strict";a.r(e);var s=a(0),r=a.n(s),i=a(4),n=a.n(i),h=(a(15),a(1)),l=a.n(h),o=a(2),u=a(5),c=a(6),d=a(9),f=a(8),g=(a(17),a(7)),p=a.n(g),m=Math.floor(window.innerHeight/25)-6,b=Math.floor(window.innerWidth/25),k=["white","lime","red","black","#f37fff","#bf49ff","gold"],v=Array(m).fill().map((function(){return Array(b)}));function x(t){var e,a;if(t.val>=0)e=a=k[t.val];else{for(e=Math.max(0,256-Math.floor(20*Math.log2(1-t.val%1e4))).toString(16),a=Math.floor(-t.val/1e4);e.length<2;)e="0"+e;e="#"+e+e+e,a=0==a?e:k[a]}return r.a.createElement("div",{className:"cell",style:{backgroundColor:e,color:a},onMouseOver:function(){return t.dragOver(0)},onMouseDown:function(){return t.dragOver(1)}},"\u25cf")}var y=function(t){Object(d.a)(a,t);var e=Object(f.a)(a);function a(t){var s;return Object(u.a)(this,a),(s=e.call(this,t)).state={grid:Array(m).fill().map((function(){return Array(b).fill(0)})),mark:0,pressed:0,fid:0,stop:[],weight:0,algo:"bfs",board:"clear",speed:1},s}return Object(c.a)(a,[{key:"componentDidMount",value:function(){this.updateAll()}},{key:"updateAll",value:function(){for(var t=this,e=function(e){v[e]=[];for(var a=function(a){v[e][a]=r.a.createElement(x,{key:e*b+a,val:t.state.grid[e][a],dragOver:function(s){return t.dragOver(e,a,s)}})},s=0;s<b;s++)a(s)},a=0;a<m;a++)e(a);this.forceUpdate()}},{key:"setVal",value:function(t,e,a,s){var i=this,n=this.state.grid.slice();n[t][e]=a,s>0&&(v[t]=v[t].slice(),v[t][e]=r.a.createElement(x,{key:t*b+e,val:this.state.grid[t][e],dragOver:function(a){return i.dragOver(t,e,a)}})),this.setState({grid:n})}},{key:"dragOver",value:function(t,e,a){(a||this.state.pressed)&&(this.state.grid[t][e]==this.state.mark?this.setVal(t,e,0):this.setVal(t,e,this.state.mark),this.search(0))}},{key:"setMark",value:function(t){this.setState({mark:t})}},{key:"mousePress",value:function(t){this.setState({pressed:t})}},{key:"sleep",value:function(t){return new Promise((function(e){return setTimeout(e,t)}))}},{key:"search",value:function(t){var e=this.state.stop.slice();e[this.state.fid-1]=1,this.setState({stop:e}),"bfs"==this.state.algo?this.bfs(t):"dfs"==this.state.algo?this.dfs(t):"dijkstra"==this.state.algo?this.dijkstra(t):"spfa"==this.state.algo?this.spfa(t):"astar"==this.state.algo&&this.astar(t),this.updateAll()}},{key:"bfs",value:function(){var t=Object(o.a)(l.a.mark((function t(e){var a,s,r,i,n,h,o,u,c,d,f,g,p;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:for(a=Date.now(),s=[1,0,-1,0],r=[0,1,0,-1],i=Array(m).fill().map((function(){return Array(b)})),n=[],h=0,o=this.state.fid,this.setState({fid:o+1}),u=0;u<m;u++)for(c=0;c<b;c++)this.state.grid[u][c]>3?this.setVal(u,c,0):1==this.state.grid[u][c]?(i[u][c]=-1,n.push([u,c])):3==this.state.grid[u][c]?i[u][c]=-1:this.state.grid[u][c]<=-1e4&&(this.state.grid[u][c]=this.state.grid[u][c]%1e4);e&&this.updateAll();case 5:if(!(h<n.length)){t.next=34;break}if(1!=this.state.stop[o]){t.next=8;break}return t.abrupt("break",34);case 8:if(d=n[h][0],f=n[h][1],h++,2!=this.state.grid[d][f]){t.next=26;break}case 11:if(-1==i[d][f]){t.next=23;break}if(1!=this.state.stop[o]){t.next=14;break}return t.abrupt("break",23);case 14:if(5==this.state.grid[d][f]?this.setVal(d,f,6,e):this.state.grid[d][f]<=-5e4&&this.setVal(d,f,this.state.grid[d][f]-1e4,e),g=i[d][f],d-=s[g],f-=r[g],!e){t.next=21;break}return t.next=21,this.sleep(e);case 21:t.next=11;break;case 23:return t.abrupt("break",34);case 26:4==this.state.grid[d][f]?this.setVal(d,f,6,e):-5e4<this.state.grid[d][f]&&this.state.grid[d][f]<=-4e4&&this.setVal(d,f,this.state.grid[d][f]-2e4,e);case 27:for(p=0;p<4;p++)0<=d+s[p]&&d+s[p]<m&&0<=f+r[p]&&f+r[p]<b&&null==i[d+s[p]][f+r[p]]&&(i[d+s[p]][f+r[p]]=p,n.push([d+s[p],f+r[p]]),0==this.state.grid[d+s[p]][f+r[p]]?this.setVal(d+s[p],f+r[p],4,e):-1e4<this.state.grid[d+s[p]][f+r[p]]&&this.state.grid[d+s[p]][f+r[p]]<0&&this.setVal(d+s[p],f+r[p],this.state.grid[d+s[p]][f+r[p]]-4e4,e));if(!e){t.next=31;break}return t.next=31,this.sleep(e);case 31:6==this.state.grid[d][f]?this.setVal(d,f,5,e):this.state.grid[d][f]<=-6e4&&this.setVal(d,f,this.state.grid[d][f]+1e4,e),t.next=5;break;case 34:console.log(Date.now()-a);case 35:case"end":return t.stop()}}),t,this)})));return function(e){return t.apply(this,arguments)}}()},{key:"dfs",value:function(){var t=Object(o.a)(l.a.mark((function t(e){var a,s,r,i,n,h,o,u,c,d,f,g;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:for(a=[1,0,-1,0],s=[0,1,0,-1],r=Array(m).fill().map((function(){return Array(b)})),i=[],n=this.state.fid,this.setState({fid:n+1}),h=0;h<m;h++)for(o=0;o<b;o++)this.state.grid[h][o]>3?this.setVal(h,o,0):1==this.state.grid[h][o]?(r[h][o]=-1,i.push([h,o])):3==this.state.grid[h][o]?r[h][o]=-1:this.state.grid[h][o]<=-1e4&&(this.state.grid[h][o]=this.state.grid[h][o]%1e4);e&&this.updateAll();case 4:if(!(i.length>0)){t.next=32;break}if(1!=this.state.stop[n]){t.next=7;break}return t.abrupt("break",32);case 7:if(u=i.pop(),c=u[0],d=u[1],2!=this.state.grid[c][d]){t.next=24;break}case 9:if(-1==r[c][d]){t.next=21;break}if(1!=this.state.stop[n]){t.next=12;break}return t.abrupt("break",21);case 12:if(5==this.state.grid[c][d]?this.setVal(c,d,6,e):this.state.grid[c][d]<=-5e4&&this.setVal(c,d,this.state.grid[c][d]-1e4,e),f=r[c][d],c-=a[f],d-=s[f],!e){t.next=19;break}return t.next=19,this.sleep(e);case 19:t.next=9;break;case 21:return t.abrupt("break",32);case 24:4==this.state.grid[c][d]?this.setVal(c,d,6,e):-5e4<this.state.grid[c][d]&&this.state.grid[c][d]<=-4e4&&this.setVal(c,d,this.state.grid[c][d]-2e4,e);case 25:for(g=0;g<4;g++)0<=c+a[g]&&c+a[g]<m&&0<=d+s[g]&&d+s[g]<b&&null==r[c+a[g]][d+s[g]]&&(r[c+a[g]][d+s[g]]=g,i.push([c+a[g],d+s[g]]),0==this.state.grid[c+a[g]][d+s[g]]?this.setVal(c+a[g],d+s[g],4,e):-1e4<this.state.grid[c+a[g]][d+s[g]]&&this.state.grid[c+a[g]][d+s[g]]<0&&this.setVal(c+a[g],d+s[g],this.state.grid[c+a[g]][d+s[g]]-4e4));if(!e){t.next=29;break}return t.next=29,this.sleep(e);case 29:6==this.state.grid[c][d]?this.setVal(c,d,5,e):this.state.grid[c][d]<=-6e4&&this.setVal(c,d,this.state.grid[c][d]+1e4,e),t.next=4;break;case 32:case"end":return t.stop()}}),t,this)})));return function(e){return t.apply(this,arguments)}}()},{key:"dijkstra",value:function(){var t=Object(o.a)(l.a.mark((function t(e){var a,s,r,i,n,h,o,u,c,d,f,g,p,k;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:for(a=[1,0,-1,0],s=[0,1,0,-1],r=Array(m).fill().map((function(){return Array(b)})),i=Array(m).fill().map((function(){return Array(b).fill(1e9)})),n=[],h=this.state.fid,this.setState({fid:h+1}),o=0;o<m;o++)for(u=0;u<b;u++)this.state.grid[o][u]>3?this.setVal(o,u,0):1==this.state.grid[o][u]?(r[o][u]=-1,n.push([o,u]),i[o][u]=0):3==this.state.grid[o][u]?(r[o][u]=-1,i[o][u]=0):this.state.grid[o][u]<=-1e4&&(this.state.grid[o][u]=this.state.grid[o][u]%1e4);e&&this.updateAll();case 4:if(!(n.length>0)){t.next=35;break}if(1!=this.state.stop[h]){t.next=7;break}return t.abrupt("break",35);case 7:for(c=0,d=0;d<n.length;d++)i[n[d][0]][n[d][1]]<i[n[c][0]][n[c][1]]&&(c=d);if(f=n[c][0],g=n[c][1],n.splice(c,1),2!=this.state.grid[f][g]){t.next=27;break}case 12:if(-1==r[f][g]){t.next=24;break}if(1!=this.state.stop[h]){t.next=15;break}return t.abrupt("break",24);case 15:if(5==this.state.grid[f][g]?this.setVal(f,g,6,e):this.state.grid[f][g]<=-5e4&&this.setVal(f,g,this.state.grid[f][g]-1e4,e),p=r[f][g],f-=a[p],g-=s[p],!e){t.next=22;break}return t.next=22,this.sleep(e);case 22:t.next=12;break;case 24:return t.abrupt("break",35);case 27:4==this.state.grid[f][g]?this.setVal(f,g,6,e):-5e4<this.state.grid[f][g]&&this.state.grid[f][g]<=-4e4&&this.setVal(f,g,this.state.grid[f][g]-2e4,e);case 28:for(k=0;k<4;k++)0<=f+a[k]&&f+a[k]<m&&0<=g+s[k]&&g+s[k]<b&&(null==r[f+a[k]][g+s[k]]&&(r[f+a[k]][g+s[k]]=k,n.push([f+a[k],g+s[k]]),0==this.state.grid[f+a[k]][g+s[k]]?this.setVal(f+a[k],g+s[k],4,e):-1e4<this.state.grid[f+a[k]][g+s[k]]&&this.state.grid[f+a[k]][g+s[k]]<0&&this.setVal(f+a[k],g+s[k],this.state.grid[f+a[k]][g+s[k]]-4e4)),i[f+a[k]][g+s[k]]>i[f][g]-Math.min(0,this.state.grid[f+a[k]][g+s[k]]%1e4)+1&&(i[f+a[k]][g+s[k]]=i[f][g]-Math.min(0,this.state.grid[f+a[k]][g+s[k]]%1e4)+1,r[f+a[k]][g+s[k]]=k));if(!e){t.next=32;break}return t.next=32,this.sleep(e);case 32:6==this.state.grid[f][g]?this.setVal(f,g,5,e):this.state.grid[f][g]<=-6e4&&this.setVal(f,g,this.state.grid[f][g]+1e4,e),t.next=4;break;case 35:case"end":return t.stop()}}),t,this)})));return function(e){return t.apply(this,arguments)}}()},{key:"spfa",value:function(){var t=Object(o.a)(l.a.mark((function t(e){var a,s,r,i,n,h,o,u,c,d,f,g;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:for(a=[1,0,-1,0],s=[0,1,0,-1],r=Array(m).fill().map((function(){return Array(b)})),i=Array(m).fill().map((function(){return Array(b).fill(1e9)})),n=[],h=this.state.fid,this.setState({fid:h+1}),o=0;o<m;o++)for(u=0;u<b;u++)this.state.grid[o][u]>3?this.setVal(o,u,0):1==this.state.grid[o][u]?(r[o][u]=-1,n.push([o,u]),i[o][u]=0):3==this.state.grid[o][u]?(r[o][u]=-1,i[o][u]=0):this.state.grid[o][u]<=-1e4&&(this.state.grid[o][u]=this.state.grid[o][u]%1e4);e&&this.updateAll();case 4:if(!(n.length>0)){t.next=33;break}if(1!=this.state.stop[h]){t.next=7;break}return t.abrupt("break",33);case 7:if(c=n[0][0],d=n[0][1],n.splice(0,1),2!=this.state.grid[c][d]){t.next=25;break}case 10:if(-1==r[c][d]){t.next=22;break}if(1!=this.state.stop[h]){t.next=13;break}return t.abrupt("break",22);case 13:if(5==this.state.grid[c][d]?this.setVal(c,d,6,e):this.state.grid[c][d]<=-5e4&&this.setVal(c,d,this.state.grid[c][d]-1e4,e),f=r[c][d],c-=a[f],d-=s[f],!e){t.next=20;break}return t.next=20,this.sleep(e);case 20:t.next=10;break;case 22:return t.abrupt("break",33);case 25:4==this.state.grid[c][d]?this.setVal(c,d,6,e):-5e4<this.state.grid[c][d]&&this.state.grid[c][d]<=-4e4&&this.setVal(c,d,this.state.grid[c][d]-2e4,e);case 26:for(g=0;g<4;g++)0<=c+a[g]&&c+a[g]<m&&0<=d+s[g]&&d+s[g]<b&&i[c+a[g]][d+s[g]]>i[c][d]-Math.min(0,this.state.grid[c+a[g]][d+s[g]]%1e4)+1&&(i[c+a[g]][d+s[g]]=i[c][d]-Math.min(0,this.state.grid[c+a[g]][d+s[g]]%1e4)+1,r[c+a[g]][d+s[g]]=g,n.push([c+a[g],d+s[g]]),0==this.state.grid[c+a[g]][d+s[g]]?this.setVal(c+a[g],d+s[g],4,e):-1e4<this.state.grid[c+a[g]][d+s[g]]&&this.state.grid[c+a[g]][d+s[g]]<0&&this.setVal(c+a[g],d+s[g],this.state.grid[c+a[g]][d+s[g]]-4e4));if(!e){t.next=30;break}return t.next=30,this.sleep(e);case 30:6==this.state.grid[c][d]?this.setVal(c,d,5,e):this.state.grid[c][d]<=-6e4&&this.setVal(c,d,this.state.grid[c][d]+1e4,e),t.next=4;break;case 33:case"end":return t.stop()}}),t,this)})));return function(e){return t.apply(this,arguments)}}()},{key:"astar",value:function(){var t=Object(o.a)(l.a.mark((function t(e){var a,s,r,i,n,h,o,u,c,d,f,g,p,k,v,x,y;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:for(a=[1,0,-1,0],s=[0,1,0,-1],r=Array(m).fill().map((function(){return Array(b)})),i=Array(m).fill().map((function(){return Array(b).fill(1e9)})),n=Array(m).fill().map((function(){return Array(b).fill(1e9)})),h=[],o=this.state.fid,this.setState({fid:o+1}),u=0;u<m;u++)for(c=0;c<b;c++)if(this.state.grid[u][c]>3)this.setVal(u,c,0);else if(1==this.state.grid[u][c])r[u][c]=-1,h.push([u,c]),i[u][c]=0;else if(2==this.state.grid[u][c])for(d=0;d<m;d++)for(f=0;f<b;f++)n[d][f]=Math.min(n[d][f],Math.abs(d-u)+Math.abs(f-c));else 3==this.state.grid[u][c]?(r[u][c]=-1,i[u][c]=0):this.state.grid[u][c]<=-1e4&&(this.state.grid[u][c]=this.state.grid[u][c]%1e4);e&&this.updateAll();case 4:if(!(h.length>0)){t.next=34;break}if(1!=this.state.stop[o]){t.next=7;break}return t.abrupt("break",34);case 7:for(p=h[g=0][0],k=h[g][1],v=0;v<h.length;v++)i[h[v][0]][h[v][1]]+n[h[v][0]][h[v][1]]<=i[p][k]+n[p][k]&&(g=v,p=h[v][0],k=h[v][1]);if(h.splice(g,1),2!=this.state.grid[p][k]){t.next=26;break}case 11:if(-1==r[p][k]){t.next=23;break}if(1!=this.state.stop[o]){t.next=14;break}return t.abrupt("break",23);case 14:if(5==this.state.grid[p][k]?this.setVal(p,k,6,e):this.state.grid[p][k]<=-5e4&&this.setVal(p,k,this.state.grid[p][k]-1e4,e),x=r[p][k],p-=a[x],k-=s[x],!e){t.next=21;break}return t.next=21,this.sleep(e);case 21:t.next=11;break;case 23:return t.abrupt("break",34);case 26:4==this.state.grid[p][k]?this.setVal(p,k,6,e):-5e4<this.state.grid[p][k]&&this.state.grid[p][k]<=-4e4&&this.setVal(p,k,this.state.grid[p][k]-2e4,e);case 27:for(y=0;y<4;y++)0<=p+a[y]&&p+a[y]<m&&0<=k+s[y]&&k+s[y]<b&&(null==r[p+a[y]][k+s[y]]&&(r[p+a[y]][k+s[y]]=y,h.push([p+a[y],k+s[y]]),0==this.state.grid[p+a[y]][k+s[y]]?this.setVal(p+a[y],k+s[y],4,e):-1e4<this.state.grid[p+a[y]][k+s[y]]&&this.state.grid[p+a[y]][k+s[y]]<0&&this.setVal(p+a[y],k+s[y],this.state.grid[p+a[y]][k+s[y]]-4e4)),i[p+a[y]][k+s[y]]>i[p][k]-Math.min(0,this.state.grid[p+a[y]][k+s[y]]%1e4)+1&&(i[p+a[y]][k+s[y]]=i[p][k]-Math.min(0,this.state.grid[p+a[y]][k+s[y]]%1e4)+1,r[p+a[y]][k+s[y]]=y));if(!e){t.next=31;break}return t.next=31,this.sleep(e);case 31:6==this.state.grid[p][k]?this.setVal(p,k,5,e):this.state.grid[p][k]<=-6e4&&this.setVal(p,k,this.state.grid[p][k]+1e4,e),t.next=4;break;case 34:case"end":return t.stop()}}),t,this)})));return function(e){return t.apply(this,arguments)}}()},{key:"setWeight",value:function(t){var e=Math.max(0,Math.min(9999,t.target.value));this.setState({weight:-e}),this.setMark(-e)}},{key:"setAlgo",value:function(t){this.setState({algo:t.target.value})}},{key:"setBoard",value:function(t){this.setState({board:t.target.value})}},{key:"setSpeed",value:function(t){this.setState({speed:t.target.value})}},{key:"clear",value:function(){var t=this.state.stop.slice();if(t[this.state.fid-1]=1,this.setState({stop:t}),"clear"==this.state.board)for(var e=0;e<m;e++)for(var a=0;a<b;a++)this.setVal(e,a,0);else if("random"==this.state.board)for(var s=0;s<m;s++)for(var r=0;r<b;r++)this.setVal(s,r,Math.random()<.2?3:0);else if("random weighted"==this.state.board)for(var i=0;i<m;i++)for(var n=0;n<b;n++)this.setVal(i,n,Math.random()<.5?0:Math.floor(-Math.random()*Math.random()*100));else if("fractal"==this.state.board||"random fractal"==this.state.board){for(var h="fractal"==this.state.board?0:.2,l=0;l<m;l++)for(var o=0;o<b;o++)this.setVal(l,o,Math.random()<h?3:0);var u=[1,0,-1,0],c=[0,1,0,-1],d=[],f=Array(m).fill().map((function(){return Array(b).fill(0)})),g=0;for(d.push([0,0]);g<d.length;){var p=d[g][0],k=d[g][1];if(g++,f[p][k]>1&&Math.random()>h&&0<p&&p<m-1&&0<k&&k<b-1)this.setVal(p,k,3);else{f[p][k]++;for(var v=0;v<4;v++)0<=p+u[v]&&p+u[v]<m&&0<=k+c[v]&&k+c[v]<b&&3!=this.state.grid[p+u[v]][k+c[v]]&&(f[p+u[v]][k+c[v]]++,1==f[p+u[v]][k+c[v]]&&d.push([p+u[v],k+c[v]]))}}}this.updateAll()}},{key:"render",value:function(){var t=this;return r.a.createElement("div",null,r.a.createElement("header",null,r.a.createElement("h1",null,r.a.createElement("a",{href:"index.html"},"Grid Simulator")),r.a.createElement("a",{href:"https://aaerialys.me"},r.a.createElement("img",{src:p.a,alt:"logo"}))),r.a.createElement("div",{className:"main"}),r.a.createElement("div",null,r.a.createElement("button",{onClick:function(){return t.setMark(3)}},"Add Wall"),r.a.createElement("button",{onClick:function(){return t.setMark(1)}},"Add Source"),r.a.createElement("button",{onClick:function(){return t.setMark(2)}},"Add Sink"),r.a.createElement("label",null,r.a.createElement("button",{onClick:function(){return t.setMark(t.state.weight)}},"Add empty cell (weighted)"),r.a.createElement("input",{type:"number",value:-this.state.weight,onChange:function(e){return t.setWeight(e)}})),r.a.createElement("label",null,r.a.createElement("button",{onClick:function(){return t.clear()}},"Set board"),r.a.createElement("select",{onChange:function(e){return t.setBoard(e)}},r.a.createElement("option",{value:"clear"},"Clear"),r.a.createElement("option",{value:"random"},"Random"),r.a.createElement("option",{value:"random weighted"},"Random weighted"),r.a.createElement("option",{value:"fractal"},"Fractal"),r.a.createElement("option",{value:"random fractal"},"Random Fractal"))),r.a.createElement("label",null,r.a.createElement("button",{onClick:function(){return t.search(t.state.speed)}},"Search"),r.a.createElement("select",{onChange:function(e){return t.setAlgo(e)}},r.a.createElement("option",{value:"bfs"},"bfs"),r.a.createElement("option",{value:"dfs"},"dfs"),r.a.createElement("option",{value:"dijkstra"},"dijkstra"),r.a.createElement("option",{value:"spfa"},"spfa"),r.a.createElement("option",{value:"astar"},"a*"))),r.a.createElement("select",{onChange:function(e){return t.setSpeed(e)}},r.a.createElement("option",{value:1},"Fast"),r.a.createElement("option",{value:100},"Medium"),r.a.createElement("option",{value:500},"Slow")),r.a.createElement("p",null,"This program simulates pathfinding algorithms on a grid to find the shortest path from any source to sink."),r.a.createElement("div",{onMouseDown:function(){return t.mousePress(1)},onMouseUp:function(){return t.mousePress(0)}},v)),r.a.createElement("footer",null,r.a.createElement("div",{className:"bottom"},r.a.createElement("p",null,"2020 | ",r.a.createElement("a",{href:"https://aaerialys.me"},"Aaerialys")))))}}]),a}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));n.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(y,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))},7:function(t,e,a){t.exports=a.p+"static/media/logo.2831d726.png"}},[[10,1,2]]]);
//# sourceMappingURL=main.7f6250e0.chunk.js.map