(this["webpackJsonpmaze-simulator"]=this["webpackJsonpmaze-simulator"]||[]).push([[0],{10:function(t,e,a){t.exports=a(18)},15:function(t,e,a){},17:function(t,e,a){},18:function(t,e,a){"use strict";a.r(e);var r=a(0),s=a.n(r),i=a(6),n=a.n(i),h=(a(15),a(1)),o=a.n(h),l=a(2),u=a(9),d=a(8),f=a(3),c=a(4),p=(a(17),a(7)),g=a.n(p),m=Math.floor((window.innerHeight-110-25*Math.ceil(1800/window.innerWidth))/26),b=Math.floor(window.innerWidth/26);console.log(m,b,window.innerHeight,window.innerWidth);var k=["white","lime","red","black","#f37fff","#bf49ff","gold"],v=Array(m).fill().map((function(){return Array(b)}));function x(t){var e=Math.max(0,255-Math.floor(20*Math.log2(t.val%1e4+1))).toString(16),a=k[Math.floor(t.val/1e4)];if("ff"==e)e=a;else{for(;e.length<2;)e="0"+e;e="#"+e+e+e}return s.a.createElement("div",{className:"cell",style:{backgroundColor:e,color:a},onMouseOver:function(){return t.dragOver(0)},onMouseDown:function(){return t.dragOver(1)}},"\u25cf")}var y=function(){function t(){Object(f.a)(this,t),this.p=Array(m*b).fill(-1)}return Object(c.a)(t,[{key:"head",value:function(t){return this.p[t]<0?t:this.p[t]=this.head(this.p[t])}},{key:"link",value:function(t,e){return t>=m*b||e>=m*b?1:(t=this.head(t))==(e=this.head(e))?0:(this.p[t]<this.p[e]?(this.p[t]+=this.p[e],this.p[e]=t):(this.p[e]+=this.p[t],this.p[t]=e),1)}}]),t}(),E=function(t){Object(u.a)(a,t);var e=Object(d.a)(a);function a(t){var r;return Object(f.a)(this,a),(r=e.call(this,t)).state={grid:Array(m).fill().map((function(){return Array(b).fill(0)})),mark:0,pressed:0,fid:0,stop:[],weight:0,algo:"bfs",board:"maze",speed:2},r}return Object(c.a)(a,[{key:"componentDidMount",value:function(){this.setBoard(),this.setState({board:"clear"})}},{key:"updateAll",value:function(){for(var t=this,e=function(e){r=[];for(var a=function(a){r[a]=s.a.createElement(x,{key:e*b+a,val:t.state.grid[e][a],dragOver:function(r){return t.dragOver(e,a,r)}})},i=0;i<b;i++)a(i);v[e]=s.a.createElement("div",null,r)},a=0;a<m;a++){var r;e(a)}this.forceUpdate()}},{key:"setVal",value:function(t,e,a,r){var i=this,n=this.state.grid.slice();if(n[t][e]=a,r>0){for(var h=[],o=function(e){h[e]=s.a.createElement(x,{key:t*b+e,val:i.state.grid[t][e],dragOver:function(a){return i.dragOver(t,e,a)}})},l=0;l<b;l++)o(l);v[t]=s.a.createElement("div",null,h)}this.setState({grid:n})}},{key:"dragOver",value:function(t,e,a){(a||this.state.pressed)&&(this.state.grid[t][e]/1e4!=this.state.mark/1e4||this.state.mark/1e4!=1&&this.state.mark/1e4!=2?this.setVal(t,e,this.state.mark):this.setVal(t,e,0),this.updateAll(),this.search(0))}},{key:"setMark",value:function(t){this.setState({mark:t})}},{key:"mousePress",value:function(t){this.setState({pressed:t})}},{key:"sleep",value:function(t){return new Promise((function(e){return setTimeout(e,t)}))}},{key:"search",value:function(t){var e=this.state.stop.slice();e[this.state.fid-1]=1,this.setState({stop:e}),"bfs"==this.state.algo?this.bfs(t):"dfs"==this.state.algo?this.dfs(t):"dijkstra"==this.state.algo?this.dijkstra(t):"dijkstra2"==this.state.algo?this.dijkstra2(t):"spfa"==this.state.algo?this.spfa(t):"astar"==this.state.algo&&this.astar(t),this.updateAll()}},{key:"bfs",value:function(){var t=Object(l.a)(o.a.mark((function t(e){var a,r,s,i,n,h,l,u,d,f,c,p,g;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:for(a=[1,0,-1,0],r=[0,1,0,-1],s=Array(m).fill().map((function(){return Array(b)})),i=[],n=0,h=this.state.fid,l=0,this.setState({fid:h+1}),u=0;u<m;u++)for(d=0;d<b;d++)this.state.grid[u][d]>3e4?this.setVal(u,d,this.state.grid[u][d]%1e4):1e4==this.state.grid[u][d]?(s[u][d]=-1,i.push([u,d])):3e4==this.state.grid[u][d]&&(s[u][d]=-1);case 3:if(!(n<i.length)){t.next=33;break}if(1!=this.state.stop[h]){t.next=6;break}return t.abrupt("break",33);case 6:if(f=i[n][0],c=i[n][1],n++,console.log(f,c,this.state.grid[f][c]),2e4!=this.state.grid[f][c]){t.next=25;break}case 10:if(-1==s[f][c]){t.next=22;break}if(1!=this.state.stop[h]){t.next=13;break}return t.abrupt("break",22);case 13:if(this.state.grid[f][c]-this.state.grid[f][c]%1e4==5e4&&this.setVal(f,c,this.state.grid[f][c]+1e4,e),p=s[f][c],f-=a[p],c-=r[p],!(1==e&&l++%10==0||e>1)){t.next=20;break}return t.next=20,this.sleep(e);case 20:t.next=10;break;case 22:return t.abrupt("break",33);case 25:this.state.grid[f][c]-this.state.grid[f][c]%1e4==4e4&&this.setVal(f,c,this.state.grid[f][c]+2e4,e);case 26:for(g=0;g<4;g++)0<=f+a[g]&&f+a[g]<m&&0<=c+r[g]&&c+r[g]<b&&null==s[f+a[g]][c+r[g]]&&(s[f+a[g]][c+r[g]]=g,i.push([f+a[g],c+r[g]]),this.state.grid[f+a[g]][c+r[g]]-this.state.grid[f+a[g]][c+r[g]]%1e4==0&&this.setVal(f+a[g],c+r[g],this.state.grid[f+a[g]][c+r[g]]+4e4,e));if(!(1==e&&l++%20==0||e>1)){t.next=30;break}return t.next=30,this.sleep(e);case 30:this.state.grid[f][c]-this.state.grid[f][c]%1e4==6e4&&this.setVal(f,c,this.state.grid[f][c]-1e4,e),t.next=3;break;case 33:case"end":return t.stop()}}),t,this)})));return function(e){return t.apply(this,arguments)}}()},{key:"dfs",value:function(){var t=Object(l.a)(o.a.mark((function t(e){var a,r,s,i,n,h,l,u,d,f,c,p,g;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:for(a=[1,0,-1,0],r=[0,1,0,-1],s=Array(m).fill().map((function(){return Array(b)})),i=[],n=this.state.fid,h=0,this.setState({fid:n+1}),l=0;l<m;l++)for(u=0;u<b;u++)this.state.grid[l][u]>3e4?this.setVal(l,u,this.state.grid[l][u]%1e4):1e4==this.state.grid[l][u]?(s[l][u]=-1,i.push([l,u])):3e4==this.state.grid[l][u]&&(s[l][u]=-1);e&&this.updateAll();case 4:if(!(i.length>0)){t.next=32;break}if(1!=this.state.stop[n]){t.next=7;break}return t.abrupt("break",32);case 7:if(d=i.pop(),f=d[0],c=d[1],2e4!=this.state.grid[f][c]){t.next=24;break}case 9:if(-1==s[f][c]){t.next=21;break}if(1!=this.state.stop[n]){t.next=12;break}return t.abrupt("break",21);case 12:if(this.state.grid[f][c]-this.state.grid[f][c]%1e4==5e4&&this.setVal(f,c,this.state.grid[f][c]+1e4,e),p=s[f][c],f-=a[p],c-=r[p],!(1==e&&h++%10==0||e>1)){t.next=19;break}return t.next=19,this.sleep(e);case 19:t.next=9;break;case 21:return t.abrupt("break",32);case 24:this.state.grid[f][c]-this.state.grid[f][c]%1e4==4e4&&this.setVal(f,c,this.state.grid[f][c]+2e4,e);case 25:for(g=0;g<4;g++)0<=f+a[g]&&f+a[g]<m&&0<=c+r[g]&&c+r[g]<b&&null==s[f+a[g]][c+r[g]]&&(s[f+a[g]][c+r[g]]=g,i.push([f+a[g],c+r[g]]),this.state.grid[f+a[g]][c+r[g]]-this.state.grid[f+a[g]][c+r[g]]%1e4==0&&this.setVal(f+a[g],c+r[g],this.state.grid[f+a[g]][c+r[g]]+4e4,e));if(!(1==e&&h++%20==0||e>1)){t.next=29;break}return t.next=29,this.sleep(e);case 29:this.state.grid[f][c]-this.state.grid[f][c]%1e4==6e4&&this.setVal(f,c,this.state.grid[f][c]-1e4,e),t.next=4;break;case 32:case"end":return t.stop()}}),t,this)})));return function(e){return t.apply(this,arguments)}}()},{key:"dijkstra",value:function(){var t=Object(l.a)(o.a.mark((function t(e){var a,r,s,i,n,h,l,u,d,f,c,p,g,k,v;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:for(a=[1,0,-1,0],r=[0,1,0,-1],s=Array(m).fill().map((function(){return Array(b)})),i=Array(m).fill().map((function(){return Array(b).fill(1e9)})),n=[],h=this.state.fid,l=0,this.setState({fid:h+1}),u=0;u<m;u++)for(d=0;d<b;d++)this.state.grid[u][d]>3e4?this.setVal(u,d,this.state.grid[u][d]%1e4):1e4==this.state.grid[u][d]?(s[u][d]=-1,n.push([u,d]),i[u][d]=0):3e4==this.state.grid[u][d]&&(s[u][d]=-1,i[u][d]=0);e&&this.updateAll();case 4:if(!(n.length>0)){t.next=35;break}if(1!=this.state.stop[h]){t.next=7;break}return t.abrupt("break",35);case 7:for(f=0,c=0;c<n.length;c++)i[n[c][0]][n[c][1]]<i[n[f][0]][n[f][1]]&&(f=c);if(p=n[f][0],g=n[f][1],n.splice(f,1),2e4!=this.state.grid[p][g]){t.next=27;break}case 12:if(-1==s[p][g]){t.next=24;break}if(1!=this.state.stop[h]){t.next=15;break}return t.abrupt("break",24);case 15:if(this.state.grid[p][g]-this.state.grid[p][g]%1e4==5e4&&this.setVal(p,g,this.state.grid[p][g]+1e4,e),k=s[p][g],p-=a[k],g-=r[k],!(1==e&&l++%10==0||e>1)){t.next=22;break}return t.next=22,this.sleep(e);case 22:t.next=12;break;case 24:return t.abrupt("break",35);case 27:this.state.grid[p][g]-this.state.grid[p][g]%1e4==4e4&&this.setVal(p,g,this.state.grid[p][g]+2e4,e);case 28:for(v=0;v<4;v++)0<=p+a[v]&&p+a[v]<m&&0<=g+r[v]&&g+r[v]<b&&(null==s[p+a[v]][g+r[v]]&&(s[p+a[v]][g+r[v]]=v,n.push([p+a[v],g+r[v]]),this.state.grid[p+a[v]][g+r[v]]-this.state.grid[p+a[v]][g+r[v]]%1e4==0&&this.setVal(p+a[v],g+r[v],this.state.grid[p+a[v]][g+r[v]]+4e4,e)),i[p+a[v]][g+r[v]]>i[p][g]+this.state.grid[p+a[v]][g+r[v]]%1e4+1&&(i[p+a[v]][g+r[v]]=i[p][g]+this.state.grid[p+a[v]][g+r[v]]%1e4+1,s[p+a[v]][g+r[v]]=v));if(!(1==e&&l++%20==0||e>1)){t.next=32;break}return t.next=32,this.sleep(e);case 32:this.state.grid[p][g]-this.state.grid[p][g]%1e4==6e4&&this.setVal(p,g,this.state.grid[p][g]-1e4,e),t.next=4;break;case 35:case"end":return t.stop()}}),t,this)})));return function(e){return t.apply(this,arguments)}}()},{key:"spfa",value:function(){var t=Object(l.a)(o.a.mark((function t(e){var a,r,s,i,n,h,l,u,d,f,c,p,g,k,v,x,y;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:for(a=[1,0,-1,0],r=[0,1,0,-1],s=Array(m).fill().map((function(){return Array(b)})),i=Array(m).fill().map((function(){return Array(b).fill(1e9)})),n=[],h=this.state.fid,l=0,this.setState({fid:h+1}),u=0;u<m;u++)for(d=0;d<b;d++)this.state.grid[u][d]>3e4?this.setVal(u,d,this.state.grid[u][d]%1e4):1e4==this.state.grid[u][d]?(s[u][d]=-1,n.push([u,d]),i[u][d]=0):3e4==this.state.grid[u][d]&&(s[u][d]=-1,i[u][d]=0);e&&this.updateAll();case 4:if(!(n.length>0)){t.next=17;break}if(1!=this.state.stop[h]){t.next=7;break}return t.abrupt("break",17);case 7:for(f=n[0][0],c=n[0][1],n.splice(0,1),this.state.grid[f][c]-this.state.grid[f][c]%1e4==4e4?this.setVal(f,c,this.state.grid[f][c]+2e4,e):this.state.grid[f][c]-this.state.grid[f][c]%1e4==5e4&&this.setVal(f,c,this.state.grid[f][c]+1e4,e),p=0;p<4;p++)0<=f+a[p]&&f+a[p]<m&&0<=c+r[p]&&c+r[p]<b&&i[f+a[p]][c+r[p]]>i[f][c]+this.state.grid[f+a[p]][c+r[p]]%1e4+1&&(i[f+a[p]][c+r[p]]=i[f][c]+this.state.grid[f+a[p]][c+r[p]]%1e4+1,s[f+a[p]][c+r[p]]=p,n.push([f+a[p],c+r[p]]),this.state.grid[f+a[p]][c+r[p]]-this.state.grid[f+a[p]][c+r[p]]%1e4==0&&this.setVal(f+a[p],c+r[p],this.state.grid[f+a[p]][c+r[p]]+4e4,e));if(!(1==e&&l++%20==0||e>1)){t.next=14;break}return t.next=14,this.sleep(e);case 14:this.state.grid[f][c]-this.state.grid[f][c]%1e4==6e4&&this.setVal(f,c,this.state.grid[f][c]-1e4,e),t.next=4;break;case 17:for(g=-1,k=-1,v=0;v<m;v++)for(x=0;x<b;x++)2e4==this.state.grid[v][x]&&(-1==g||i[v][x]<i[g][k])&&(g=v,k=x);if(!(-1!=g&&i[g][k]<1e9)){t.next=32;break}case 20:if(-1==s[g][k]){t.next=32;break}if(1!=this.state.stop[h]){t.next=23;break}return t.abrupt("break",32);case 23:if(this.state.grid[g][k]-this.state.grid[g][k]%1e4==5e4&&this.setVal(g,k,this.state.grid[g][k]+1e4,e),y=s[g][k],g-=a[y],k-=r[y],!(1==e&&l++%10==0||e>1)){t.next=30;break}return t.next=30,this.sleep(e);case 30:t.next=20;break;case 32:case"end":return t.stop()}}),t,this)})));return function(e){return t.apply(this,arguments)}}()},{key:"astar",value:function(){var t=Object(l.a)(o.a.mark((function t(e){var a,r,s,i,n,h,l,u,d,f,c,p,g,k,v,x,y,E;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:for(a=[1,0,-1,0],r=[0,1,0,-1],s=Array(m).fill().map((function(){return Array(b)})),i=Array(m).fill().map((function(){return Array(b).fill(1e9)})),n=Array(m).fill().map((function(){return Array(b).fill(1e9)})),h=[],l=this.state.fid,u=0,this.setState({fid:l+1}),d=0;d<m;d++)for(f=0;f<b;f++)if(this.state.grid[d][f]>3e4)this.setVal(d,f,this.state.grid[d][f]%1e4);else if(1e4==this.state.grid[d][f])s[d][f]=-1,h.push([d,f]),i[d][f]=0;else if(2e4==this.state.grid[d][f])for(c=0;c<m;c++)for(p=0;p<b;p++)n[c][p]=Math.min(n[c][p],Math.abs(c-d)+Math.abs(p-f));else 3e4==this.state.grid[d][f]&&(s[d][f]=-1,i[d][f]=0);e&&this.updateAll();case 4:if(!(h.length>0)){t.next=35;break}if(1!=this.state.stop[l]){t.next=7;break}return t.abrupt("break",35);case 7:for(k=h[g=0][0],v=h[g][1],x=0;x<h.length;x++)i[h[x][0]][h[x][1]]+n[h[x][0]][h[x][1]]<=i[k][v]+n[k][v]&&(g=x,k=h[x][0],v=h[x][1]);if(h.splice(g,1),2e4!=this.state.grid[k][v]){t.next=27;break}case 11:if(-1==s[k][v]){t.next=24;break}if(1!=this.state.stop[l]){t.next=14;break}return t.abrupt("break",24);case 14:if(5==this.state.grid[k][v]&&this.setVal(k,v,6,e),this.state.grid[k][v]-this.state.grid[k][v]%1e4==5e4&&this.setVal(k,v,this.state.grid[k][v]+1e4,e),y=s[k][v],k-=a[y],v-=r[y],!(1==e&&u++%10==0||e>1)){t.next=22;break}return t.next=22,this.sleep(e);case 22:t.next=11;break;case 24:return t.abrupt("break",35);case 27:this.state.grid[k][v]-this.state.grid[k][v]%1e4==4e4&&this.setVal(k,v,this.state.grid[k][v]+2e4,e);case 28:for(E=0;E<4;E++)0<=k+a[E]&&k+a[E]<m&&0<=v+r[E]&&v+r[E]<b&&(null==s[k+a[E]][v+r[E]]&&(s[k+a[E]][v+r[E]]=E,h.push([k+a[E],v+r[E]]),this.state.grid[k+a[E]][v+r[E]]-this.state.grid[k+a[E]][v+r[E]]%1e4==0&&this.setVal(k+a[E],v+r[E],this.state.grid[k+a[E]][v+r[E]]+4e4,e)),i[k+a[E]][v+r[E]]>i[k][v]+this.state.grid[k+a[E]][v+r[E]]%1e4+1&&(i[k+a[E]][v+r[E]]=i[k][v]+this.state.grid[k+a[E]][v+r[E]]%1e4+1,s[k+a[E]][v+r[E]]=E));if(!(1==e&&u++%20==0||e>1)){t.next=32;break}return t.next=32,this.sleep(e);case 32:this.state.grid[k][v]-this.state.grid[k][v]%1e4==6e4&&this.setVal(k,v,this.state.grid[k][v]-1e4,e),t.next=4;break;case 35:case"end":return t.stop()}}),t,this)})));return function(e){return t.apply(this,arguments)}}()},{key:"dijkstra2",value:function(){var t=Object(l.a)(o.a.mark((function t(e){var a,r,s,i,n,h,l,u,d,f,c,p,g,k,v,x,y,E,M,A;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:for(a=[1,0,-1,0],r=[0,1,0,-1],s=Array(2).fill().map((function(){return Array(m).fill().map((function(){return Array(b)}))})),i=Array(2).fill().map((function(){return Array(m).fill().map((function(){return Array(b).fill(1e9)}))})),n=[],h=this.state.fid,l=0,this.setState({fid:h+1}),u=0;u<m;u++)for(d=0;d<b;d++)this.state.grid[u][d]>3e4?this.setVal(u,d,this.state.grid[u][d]%1e4):1e4==this.state.grid[u][d]?(s[0][u][d]=-1,n.push([0,u,d]),i[0][u][d]=0):2e4==this.state.grid[u][d]?(s[1][u][d]=-1,n.push([1,u,d]),i[1][u][d]=0):3e4==this.state.grid[u][d]&&(s[0][u][d]=s[1][u][d]=-1,i[0][u][d]=i[1][u][d]=0);console.log(n),e&&this.updateAll();case 5:if(!(n.length>0)){t.next=45;break}if(1!=this.state.stop[h]){t.next=8;break}return t.abrupt("break",45);case 8:for(f=0,c=0;c<n.length;c++)i[n[c][0]][n[c][1]][n[c][2]]<i[n[f][0]][n[f][1]][n[f][2]]&&(f=c);if(p=n[f][0],g=n[f][1],k=n[f][2],n.splice(f,1),!(i[1-p][g][k]<1e9)){t.next=37;break}v=0;case 14:if(!(v<2)){t.next=34;break}x=v,y=g,E=k;case 16:if(-1==s[v][g][k]){t.next=28;break}if(1!=this.state.stop[h]){t.next=19;break}return t.abrupt("break",28);case 19:if(this.state.grid[g][k]-this.state.grid[g][k]%1e4!=5e4&&this.state.grid[g][k]-this.state.grid[g][k]%1e4!=4e4||this.setVal(g,k,this.state.grid[g][k]+1e4,e),M=s[v][g][k],g-=a[M],k-=r[M],!(1==e&&l++%10==0||e>1)){t.next=26;break}return t.next=26,this.sleep(e);case 26:t.next=16;break;case 28:v=x,g=y,k=E;case 31:v++,t.next=14;break;case 34:return t.abrupt("break",45);case 37:this.state.grid[g][k]-this.state.grid[g][k]%1e4==4e4&&this.setVal(g,k,this.state.grid[g][k]+2e4,e);case 38:for(A=0;A<4;A++)0<=g+a[A]&&g+a[A]<m&&0<=k+r[A]&&k+r[A]<b&&(null==s[p][g+a[A]][k+r[A]]&&(s[p][g+a[A]][k+r[A]]=A,n.push([p,g+a[A],k+r[A]]),this.state.grid[g+a[A]][k+r[A]]-this.state.grid[g+a[A]][k+r[A]]%1e4==0&&this.setVal(g+a[A],k+r[A],this.state.grid[g+a[A]][k+r[A]]+4e4,e)),i[p][g+a[A]][k+r[A]]>i[p][g][k]+this.state.grid[g+a[A]][k+r[A]]%1e4+1&&(i[p][g+a[A]][k+r[A]]=i[p][g][k]+this.state.grid[g+a[A]][k+r[A]]%1e4+1,s[p][g+a[A]][k+r[A]]=A));if(!(1==e&&l++%20==0||e>1)){t.next=42;break}return t.next=42,this.sleep(e);case 42:this.state.grid[g][k]-this.state.grid[g][k]%1e4==6e4&&this.setVal(g,k,this.state.grid[g][k]-1e4,e),t.next=5;break;case 45:case"end":return t.stop()}}),t,this)})));return function(e){return t.apply(this,arguments)}}()},{key:"setWeight",value:function(t){var e=Math.max(0,Math.min(9999,t.target.value));this.setState({weight:e}),this.setMark(e)}},{key:"setAlgo",value:function(t){this.setState({algo:t.target.value})}},{key:"setBoardOption",value:function(t){this.setState({board:t.target.value})}},{key:"setSpeed",value:function(t){this.setState({speed:t.target.value})}},{key:"setBoard",value:function(){var t=this.state.stop.slice();if(t[this.state.fid-1]=1,this.setState({stop:t}),"clear"==this.state.board)for(var e=0;e<m;e++)for(var a=0;a<b;a++)this.setVal(e,a,0);else if("random"==this.state.board)for(var r=0;r<m;r++)for(var s=0;s<b;s++)this.setVal(r,s,Math.random()<.2?3e4:0);else if("random weighted"==this.state.board)for(var i=0;i<m;i++)for(var n=0;n<b;n++)this.setVal(i,n,Math.random()<.5?0:Math.floor(Math.random()*Math.random()*100));else if("fractal"==this.state.board||"random fractal"==this.state.board){for(var h="fractal"==this.state.board?0:.2,o=0;o<m;o++)for(var l=0;l<b;l++)this.setVal(o,l,Math.random()<h?3e4:0);var u=[1,0,-1,0],d=[0,1,0,-1],f=[],c=Array(m).fill().map((function(){return Array(b).fill(0)})),p=0;for(f.push([0,0]);p<f.length;){var g=f[p][0],k=f[p][1];if(p++,c[g][k]>1&&Math.random()>h&&0<g&&g<m-1&&0<k&&k<b-1)this.setVal(g,k,3e4);else{c[g][k]++;for(var v=0;v<4;v++)0<=g+u[v]&&g+u[v]<m&&0<=k+d[v]&&k+d[v]<b&&3e4!=this.state.grid[g+u[v]][k+d[v]]&&(c[g+u[v]][k+d[v]]++,1==c[g+u[v]][k+d[v]]&&f.push([g+u[v],k+d[v]]))}}}else if("maze"==this.state.board){for(var x=[],E=new y,M=0;M<m;M++)for(var A=0;A<b;A++)this.setVal(M,A,M%2==0&&A%2==0?0:3e4),M%2==0&&A%2==0&&M<m-1&&x.push([M,A,0]),M%2==0&&A%2==0&&A<b-1&&x.push([M,A,1]);for(var V=x.length-1;V>=0;V--){var w=Math.floor(Math.random()*(V+1)),S=x[w];x[w]=x[V],(E.link(S[0]*b+S[1],(S[0]+2-2*S[2])*b+S[1]+2*S[2])||Math.random()<.1)&&this.setVal(S[0]+1-S[2],S[1]+S[2],0)}}else if("path"==this.state.board||"random path 1"==this.state.board||"random path 2"==this.state.board||"random path 3"==this.state.board){var j=[1,0,-1,0],O=[0,1,0,-1],P=Array(m).fill().map((function(){return Array(b)})),C=[[0,0]],z=1,B=0;for("random path 3"==this.state.board?B=1:"random path 2"==this.state.board?B=.1:"random path 1"==this.state.board&&(B=.01),"path"!=this.state.board&&(C=[[Math.floor(Math.random()*m),Math.floor(Math.random()*b)]]);z<m*b;){for(var W=C.pop(),R=W[0],F=W[1],D=1,N=0;N<4;N++)0<=R+j[N]&&R+j[N]<m&&0<=F+O[N]&&F+O[N]<b&&null==P[R+j[N]][F+O[N]]&&(P[R+j[N]][F+O[N]]=3e4,C.push([R+j[N],F+O[N]]),z++,D=0);if(1!=D&&(P[R][F]=0,Math.random()<B))for(var H=3;H>=0;H--){var J=Math.floor(Math.random()*(H+1)),T=j[J],U=O[J];j[J]=j[H],O[J]=O[H],j[H]=T,O[H]=U}}for(var I=0;I<m;I++)for(var $=0;$<b;$++)this.setVal(I,$,P[I][$])}else if("partitioned"==this.state.board){for(var q=0;q<m;q++)for(var G=0;G<b;G++)this.setVal(q,G,0);this.setPartition(0,m,0,b)}this.updateAll()}},{key:"setPartition",value:function(t,e,a,r){if(!(e-t<2&&r-a<3||r-a<2&&e-t<3))if(e-t>r-a){for(var s=0,i=1;s%2==0;)s=Math.floor(Math.random()*(e-t-2)+t+1);for(;i%2==1;)i=Math.floor(Math.random()*(r-a)+a);for(var n=a;n<r;n++)n!=i&&this.setVal(s,n,3e4);this.setPartition(t,s,a,r),this.setPartition(s+1,e,a,r)}else{for(var h=0,o=1;h%2==0;)h=Math.floor(Math.random()*(r-a-2)+a+1);for(;o%2==1;)o=Math.floor(Math.random()*(e-t)+t);for(var l=t;l<e;l++)l!=o&&this.setVal(l,h,3e4);this.setPartition(t,e,a,h),this.setPartition(t,e,h+1,r)}}},{key:"render",value:function(){var t=this;return s.a.createElement("div",null,s.a.createElement("header",null,s.a.createElement("h1",null,s.a.createElement("a",{href:"index.html"},"Maze Simulator")),s.a.createElement("a",{href:"https://aaeria.me"},s.a.createElement("img",{src:g.a,alt:"logo"}))),s.a.createElement("div",{className:"main"}),s.a.createElement("div",null,s.a.createElement("button",{onClick:function(){return t.setMark(3e4)}},"Add Wall"),s.a.createElement("button",{onClick:function(){return t.setMark(1e4)}},"Add Start"),s.a.createElement("button",{onClick:function(){return t.setMark(2e4)}},"Add End"),s.a.createElement("label",null,s.a.createElement("button",{onClick:function(){return t.setMark(t.state.weight)}},"Add empty cell (weighted)"),s.a.createElement("input",{type:"number",value:this.state.weight,onChange:function(e){return t.setWeight(e)}})),s.a.createElement("label",null,s.a.createElement("button",{onClick:function(){return t.setBoard()}},"Set board"),s.a.createElement("select",{value:this.state.board,onChange:function(e){return t.setBoardOption(e)}},s.a.createElement("option",{value:"clear"},"Clear"),s.a.createElement("option",{value:"random"},"Random"),s.a.createElement("option",{value:"random weighted"},"Random weighted"),s.a.createElement("option",{value:"fractal"},"Fractal"),s.a.createElement("option",{value:"random fractal"},"Random Fractal"),s.a.createElement("option",{value:"maze"},"Maze"),s.a.createElement("option",{value:"path"},"Path"),s.a.createElement("option",{value:"random path 1"},"Random Path 1"),s.a.createElement("option",{value:"random path 2"},"Random Path 2"),s.a.createElement("option",{value:"random path 3"},"Random Path 3"),s.a.createElement("option",{value:"partitioned"},"Partitioned Maze"))),s.a.createElement("label",null,s.a.createElement("button",{onClick:function(){return t.search(t.state.speed)}},"Search"),s.a.createElement("select",{onChange:function(e){return t.setAlgo(e)}},s.a.createElement("option",{value:"bfs"},"bfs"),s.a.createElement("option",{value:"dfs"},"dfs"),s.a.createElement("option",{value:"dijkstra"},"dijkstra"),s.a.createElement("option",{value:"dijkstra2"},"Bidirectional dijkstra"),s.a.createElement("option",{value:"spfa"},"spfa"),s.a.createElement("option",{value:"astar"},"a*")),s.a.createElement("select",{value:this.state.speed,onChange:function(e){return t.setSpeed(e)}},s.a.createElement("option",{value:1},"Very Fast"),s.a.createElement("option",{value:2},"Fast"),s.a.createElement("option",{value:100},"Medium"),s.a.createElement("option",{value:500},"Slow"))),s.a.createElement("p",null,"This program simulates pathfinding algorithms on a grid to find the shortest path from any start to end cell."),s.a.createElement("div",{onMouseDown:function(){return t.mousePress(1)},onMouseUp:function(){return t.mousePress(0)}},v)),s.a.createElement("footer",null,s.a.createElement("div",{className:"bottom"},s.a.createElement("p",null,"2020 | ",s.a.createElement("a",{href:"https://aaeria.me"},"Aaeria")))))}}]),a}(s.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));n.a.render(s.a.createElement(s.a.StrictMode,null,s.a.createElement(E,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))},7:function(t,e,a){t.exports=a.p+"static/media/logo.2831d726.png"}},[[10,1,2]]]);
//# sourceMappingURL=main.8e0a8965.chunk.js.map