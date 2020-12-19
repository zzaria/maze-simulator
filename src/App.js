import React from 'react';
import './App.css';
import logo from './assets/images/logo.png'

var H=Math.floor((window.innerHeight-110-25*Math.ceil(1800/window.innerWidth))/25),W=Math.floor(window.innerWidth/25);
var color=["white", "lime", "red", "black", "#f37fff", "#bf49ff","gold"];
var display=Array(H).fill().map(()=>Array(W));
function Cell(props){
	var col=Math.max(0,255-Math.floor(Math.log2(props.val%10000+1)*20)).toString(16),col2=color[Math.floor(props.val/10000)];
    if(col=="ff") col=col2;
    else{
        while(col.length<2) col="0"+col;
        col="#"+col+col+col;
    }
    return(
        <div className="cell" style={{backgroundColor: col, color: col2}} onMouseOver={() => props.dragOver(0)} onMouseDown={() => props.dragOver(1)}>
            ●
        </div>
    );
}
class DSU{
	constructor(){
		this.p=Array(H*W).fill(-1);
	}
	head(x){return this.p[x]<0? x: this.p[x]=this.head(this.p[x]);}
	link(u,v){
		if(u>=H*W||v>=H*W) return 1;
		u=this.head(u); v=this.head(v);
		if(u==v) return 0;
		if(this.p[u]<this.p[v]){
			this.p[u]+=this.p[v]; this.p[v]=u;
		}
		else{
			this.p[v]+=this.p[u]; this.p[u]=v;
		}
		return 1;
	}
}
class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            grid: Array(H).fill().map(()=>Array(W).fill(0)),
            mark: 0,
            pressed: 0,
            fid: 0,
            stop: [],
            weight: 0,
            algo: "bfs",
            board: "maze",
            speed: 2,
        };
    }
    componentDidMount(){
    	this.setBoard();
    	this.setState({board:"clear"});
    }
    updateAll(){
    	for(let i=0;i<H;i++){
    		display[i]=[];
    		for(let j=0;j<W;j++) display[i][j]=<Cell key={i*W+j} val={this.state.grid[i][j]} dragOver={(x)=> this.dragOver(i,j,x)}/>;
    	}
    	this.forceUpdate();
    }
    setVal(x,y,val,upd){
        var grid2=this.state.grid.slice();
        grid2[x][y]=val;
        if(upd>0){
        	display[x]=display[x].slice();
        	display[x][y]=<Cell key={x*W+y} val={this.state.grid[x][y]} dragOver={(v)=> this.dragOver(x,y,v)}/>;
        }
        this.setState({grid:grid2});
    }
    dragOver(x,y,click){
        if(!click&&!this.state.pressed) return;
        if(this.state.grid[x][y]/10000==this.state.mark/10000&&(this.state.mark/10000==1||this.state.mark/10000==2)) this.setVal(x,y,0);
        else this.setVal(x,y,this.state.mark);
        this.updateAll();
        this.search(0);
    }
    setMark(x){
        this.setState({mark:x});
    }
    mousePress(x){
        this.setState({pressed:x});
    }
    sleep(delay) {
      return new Promise(resolve => setTimeout(resolve, delay));
    }
    search(delay){
        var stop2=this.state.stop.slice(); stop2[this.state.fid-1]=1; this.setState({stop:stop2});
        if(this.state.algo=="bfs") this.bfs(delay);
        else if(this.state.algo=="dfs") this.dfs(delay);
        else if(this.state.algo=="dijkstra") this.dijkstra(delay);
        else if(this.state.algo=="spfa") this.spfa(delay);
        else if(this.state.algo=="astar") this.astar(delay);
        this.updateAll();
    }
    async bfs(delay){
        var dx=[1,0,-1,0],dy=[0,1,0,-1],p=Array(H).fill().map(()=>Array(W)),toV=[],cur=0,id=this.state.fid,cnt=0; this.setState({fid:id+1});
        for(let i=0;i<H;i++) for(let j=0;j<W;j++){
            if(this.state.grid[i][j]>30000) this.setVal(i,j,this.state.grid[i][j]%10000);
            else if(this.state.grid[i][j]==10000){
                p[i][j]=-1; toV.push([i,j]);
            }
            else if(this.state.grid[i][j]==30000) p[i][j]=-1;
        }
        while(cur<toV.length){
            if(this.state.stop[id]==1) break;
            let x=toV[cur][0],y=toV[cur][1]; cur++;
            console.log(x,y,this.state.grid[x][y]);
            if(this.state.grid[x][y]==20000){
                while(p[x][y]!=-1){
                    if(this.state.stop[id]==1) break;
                    if(this.state.grid[x][y]-this.state.grid[x][y]%10000==50000) this.setVal(x,y,this.state.grid[x][y]+10000,delay);
                    let d=p[x][y]; x-=dx[d]; y-=dy[d];
                    if(delay==1&&cnt++%10==0||delay>1) await this.sleep(delay);
                }
                break;
            }
            else if(this.state.grid[x][y]-this.state.grid[x][y]%10000==40000) this.setVal(x,y,this.state.grid[x][y]+20000,delay);
            for(let i=0;i<4;i++) if(0<=x+dx[i]&&x+dx[i]<H&&0<=y+dy[i]&&y+dy[i]<W&&p[x+dx[i]][y+dy[i]]==null){
                p[x+dx[i]][y+dy[i]]=i; toV.push([x+dx[i],y+dy[i]]);
                if(this.state.grid[x+dx[i]][y+dy[i]]-this.state.grid[x+dx[i]][y+dy[i]]%10000==0) this.setVal(x+dx[i],y+dy[i],this.state.grid[x+dx[i]][y+dy[i]]+40000,delay);
            }
            if(delay==1&&cnt++%20==0||delay>1) await this.sleep(delay);
            if(this.state.grid[x][y]-this.state.grid[x][y]%10000==60000) this.setVal(x,y,this.state.grid[x][y]-10000,delay);
        }
    }
    async dfs(delay){
        var dx=[1,0,-1,0],dy=[0,1,0,-1],p=Array(H).fill().map(()=>Array(W)),toV=[],id=this.state.fid,cnt=0; this.setState({fid:id+1});
        for(let i=0;i<H;i++) for(let j=0;j<W;j++){
            if(this.state.grid[i][j]>30000) this.setVal(i,j,this.state.grid[i][j]%10000);
            else if(this.state.grid[i][j]==10000){
                p[i][j]=-1; toV.push([i,j]);
            }
            else if(this.state.grid[i][j]==30000) p[i][j]=-1;
        }
        if(delay) this.updateAll();
        while(toV.length>0){
            if(this.state.stop[id]==1) break;
            let xy=toV.pop(),x=xy[0],y=xy[1];
            if(this.state.grid[x][y]==20000){
                while(p[x][y]!=-1){
                    if(this.state.stop[id]==1) break;
                    if(this.state.grid[x][y]-this.state.grid[x][y]%10000==50000) this.setVal(x,y,this.state.grid[x][y]+10000,delay);
                    let d=p[x][y]; x-=dx[d]; y-=dy[d];
                    if(delay==1&&cnt++%10==0||delay>1) await this.sleep(delay);
                }
                break;
            }
            else if(this.state.grid[x][y]-this.state.grid[x][y]%10000==40000) this.setVal(x,y,this.state.grid[x][y]+20000,delay);
            for(let i=0;i<4;i++) if(0<=x+dx[i]&&x+dx[i]<H&&0<=y+dy[i]&&y+dy[i]<W&&p[x+dx[i]][y+dy[i]]==null){
                p[x+dx[i]][y+dy[i]]=i; toV.push([x+dx[i],y+dy[i]]);
                if(this.state.grid[x+dx[i]][y+dy[i]]-this.state.grid[x+dx[i]][y+dy[i]]%10000==0) this.setVal(x+dx[i],y+dy[i],this.state.grid[x+dx[i]][y+dy[i]]+40000,delay);
            }
            if(delay==1&&cnt++%20==0||delay>1) await this.sleep(delay);
            if(this.state.grid[x][y]-this.state.grid[x][y]%10000==60000) this.setVal(x,y,this.state.grid[x][y]-10000,delay);
        }
    }
    async dijkstra(delay){
        var dx=[1,0,-1,0],dy=[0,1,0,-1],p=Array(H).fill().map(()=>Array(W)),d=Array(H).fill().map(()=>Array(W).fill(1e9)),toV=[],id=this.state.fid,cnt=0; this.setState({fid:id+1});
        for(let i=0;i<H;i++) for(let j=0;j<W;j++){
            if(this.state.grid[i][j]>30000) this.setVal(i,j,this.state.grid[i][j]%10000);
            else if(this.state.grid[i][j]==10000){
                p[i][j]=-1; toV.push([i,j]); d[i][j]=0;
            }
            else if(this.state.grid[i][j]==30000){
                p[i][j]=-1; d[i][j]=0;
            }
        }
        if(delay) this.updateAll();
        while(toV.length>0){
            if(this.state.stop[id]==1) break;
            let cur=0;
            for(let i=0;i<toV.length;i++) if(d[toV[i][0]][toV[i][1]]<d[toV[cur][0]][toV[cur][1]]) cur=i;
            let x=toV[cur][0],y=toV[cur][1]; toV.splice(cur,1);
            if(this.state.grid[x][y]==20000){
                while(p[x][y]!=-1){
                    if(this.state.stop[id]==1) break;
                    if(this.state.grid[x][y]-this.state.grid[x][y]%10000==50000) this.setVal(x,y,this.state.grid[x][y]+10000,delay);
                    let dir=p[x][y]; x-=dx[dir]; y-=dy[dir];
                    if(delay==1&&cnt++%10==0||delay>1) await this.sleep(delay);
                }
                break;
            }
            else if(this.state.grid[x][y]-this.state.grid[x][y]%10000==40000) this.setVal(x,y,this.state.grid[x][y]+20000,delay);
            for(let i=0;i<4;i++) if(0<=x+dx[i]&&x+dx[i]<H&&0<=y+dy[i]&&y+dy[i]<W){
                if(p[x+dx[i]][y+dy[i]]==null){
                    p[x+dx[i]][y+dy[i]]=i; toV.push([x+dx[i],y+dy[i]]);
                	if(this.state.grid[x+dx[i]][y+dy[i]]-this.state.grid[x+dx[i]][y+dy[i]]%10000==0) this.setVal(x+dx[i],y+dy[i],this.state.grid[x+dx[i]][y+dy[i]]+40000,delay);
                }
                if(d[x+dx[i]][y+dy[i]]>d[x][y]+this.state.grid[x+dx[i]][y+dy[i]]%10000+1){
                    d[x+dx[i]][y+dy[i]]=d[x][y]+this.state.grid[x+dx[i]][y+dy[i]]%10000+1;
                    p[x+dx[i]][y+dy[i]]=i;
                }
            }
            if(delay==1&&cnt++%20==0||delay>1) await this.sleep(delay);
            if(this.state.grid[x][y]-this.state.grid[x][y]%10000==60000) this.setVal(x,y,this.state.grid[x][y]-10000,delay);
        }
    }
    async spfa(delay){
        var dx=[1,0,-1,0],dy=[0,1,0,-1],p=Array(H).fill().map(()=>Array(W)),d=Array(H).fill().map(()=>Array(W).fill(1e9)),toV=[],id=this.state.fid,cnt=0; this.setState({fid:id+1});
        for(let i=0;i<H;i++) for(let j=0;j<W;j++){
            if(this.state.grid[i][j]>30000) this.setVal(i,j,this.state.grid[i][j]%10000);
            else if(this.state.grid[i][j]==10000){
                p[i][j]=-1; toV.push([i,j]); d[i][j]=0;
            }
            else if(this.state.grid[i][j]==30000){
                p[i][j]=-1; d[i][j]=0;
            }
        }
        if(delay) this.updateAll();
        while(toV.length>0){
            if(this.state.stop[id]==1) break;
            let x=toV[0][0],y=toV[0][1]; toV.splice(0,1);
            if(this.state.grid[x][y]-this.state.grid[x][y]%10000==40000) this.setVal(x,y,this.state.grid[x][y]+20000,delay);
            else if(this.state.grid[x][y]-this.state.grid[x][y]%10000==50000) this.setVal(x,y,this.state.grid[x][y]+10000,delay);
            for(let i=0;i<4;i++) if(0<=x+dx[i]&&x+dx[i]<H&&0<=y+dy[i]&&y+dy[i]<W){
                if(d[x+dx[i]][y+dy[i]]>d[x][y]+this.state.grid[x+dx[i]][y+dy[i]]%10000+1){
                    d[x+dx[i]][y+dy[i]]=d[x][y]+this.state.grid[x+dx[i]][y+dy[i]]%10000+1;
                    p[x+dx[i]][y+dy[i]]=i; toV.push([x+dx[i],y+dy[i]]);
                	if(this.state.grid[x+dx[i]][y+dy[i]]-this.state.grid[x+dx[i]][y+dy[i]]%10000==0) this.setVal(x+dx[i],y+dy[i],this.state.grid[x+dx[i]][y+dy[i]]+40000,delay);
                }
            }
            if(delay==1&&cnt++%20==0||delay>1) await this.sleep(delay);
            if(this.state.grid[x][y]-this.state.grid[x][y]%10000==60000) this.setVal(x,y,this.state.grid[x][y]-10000,delay);
        }
        let x=-1,y=-1;
        for(let i=0;i<H;i++) for(let j=0;j<W;j++) if(this.state.grid[i][j]==20000&&(x==-1||d[i][j]<d[x][y])){
        	x=i; y=j;
        }
        if(x!=-1&&d[x][y]<1e9) while(p[x][y]!=-1){
            if(this.state.stop[id]==1) break;
            if(this.state.grid[x][y]-this.state.grid[x][y]%10000==50000) this.setVal(x,y,this.state.grid[x][y]+10000,delay);
            let dir=p[x][y]; x-=dx[dir]; y-=dy[dir];
            if(delay==1&&cnt++%10==0||delay>1) await this.sleep(delay);
        }
    }
    async astar(delay){
        var dx=[1,0,-1,0],dy=[0,1,0,-1],p=Array(H).fill().map(()=>Array(W)),d=Array(H).fill().map(()=>Array(W).fill(1e9)),d2=Array(H).fill().map(()=>Array(W).fill(1e9)),toV=[],id=this.state.fid,cnt=0; this.setState({fid:id+1});
        for(let i=0;i<H;i++) for(let j=0;j<W;j++){
            if(this.state.grid[i][j]>30000) this.setVal(i,j,this.state.grid[i][j]%10000);
            else if(this.state.grid[i][j]==10000){
                p[i][j]=-1; toV.push([i,j]); d[i][j]=0;
            }
            else if(this.state.grid[i][j]==20000){
                for(let ii=0;ii<H;ii++) for(let jj=0;jj<W;jj++) d2[ii][jj]=Math.min(d2[ii][jj],Math.abs(ii-i)+Math.abs(jj-j));
            }
            else if(this.state.grid[i][j]==30000){
                p[i][j]=-1; d[i][j]=0;
            }
        }
        if(delay) this.updateAll();
        while(toV.length>0){
            if(this.state.stop[id]==1) break;
            let cur=0,x=toV[cur][0],y=toV[cur][1];
            for(let i=0;i<toV.length;i++) if(d[toV[i][0]][toV[i][1]]+d2[toV[i][0]][toV[i][1]]<=d[x][y]+d2[x][y]){
                cur=i; x=toV[i][0]; y=toV[i][1];
            }
            toV.splice(cur,1);
            if(this.state.grid[x][y]==20000){
                while(p[x][y]!=-1){
                    if(this.state.stop[id]==1) break;
                    if(this.state.grid[x][y]==5) this.setVal(x,y,6,delay);
                    if(this.state.grid[x][y]-this.state.grid[x][y]%10000==50000) this.setVal(x,y,this.state.grid[x][y]+10000,delay);
                    let dir=p[x][y]; x-=dx[dir]; y-=dy[dir];
                    if(delay==1&&cnt++%10==0||delay>1) await this.sleep(delay);
                }
                break;
            }
            else if(this.state.grid[x][y]-this.state.grid[x][y]%10000==40000) this.setVal(x,y,this.state.grid[x][y]+20000,delay);
            for(let i=0;i<4;i++) if(0<=x+dx[i]&&x+dx[i]<H&&0<=y+dy[i]&&y+dy[i]<W){
                if(p[x+dx[i]][y+dy[i]]==null){
                    p[x+dx[i]][y+dy[i]]=i; toV.push([x+dx[i],y+dy[i]]);
                	if(this.state.grid[x+dx[i]][y+dy[i]]-this.state.grid[x+dx[i]][y+dy[i]]%10000==0) this.setVal(x+dx[i],y+dy[i],this.state.grid[x+dx[i]][y+dy[i]]+40000,delay);
                }
                if(d[x+dx[i]][y+dy[i]]>d[x][y]+this.state.grid[x+dx[i]][y+dy[i]]%10000+1){
                    d[x+dx[i]][y+dy[i]]=d[x][y]+this.state.grid[x+dx[i]][y+dy[i]]%10000+1;
                    p[x+dx[i]][y+dy[i]]=i;
                }
            }
            if(delay==1&&cnt++%20==0||delay>1) await this.sleep(delay);
            if(this.state.grid[x][y]-this.state.grid[x][y]%10000==60000) this.setVal(x,y,this.state.grid[x][y]-10000,delay);
        }
    }
    setWeight(event){
        var w=Math.max(0,Math.min(9999,event.target.value));
        this.setState({weight:w});
        this.setMark(w);
    }
    setAlgo(event){
        this.setState({algo:event.target.value});
    }
    setBoardOption(event){
        this.setState({board:event.target.value});
    }
    setSpeed(event){
    	this.setState({speed:event.target.value});
    }
    setBoard() {
        var stop2=this.state.stop.slice(); stop2[this.state.fid-1]=1; this.setState({stop:stop2});
        if(this.state.board=="clear") for(let i=0;i<H;i++) for(let j=0;j<W;j++) this.setVal(i,j,0);
        else if(this.state.board=="random") for(let i=0;i<H;i++) for(let j=0;j<W;j++) this.setVal(i,j,Math.random()<0.2? 30000: 0);
        else if(this.state.board=="random weighted") for(let i=0;i<H;i++) for(let j=0;j<W;j++) this.setVal(i,j,Math.random()<0.5? 0: Math.floor((Math.random()*Math.random()*100)));
        else if(this.state.board=="fractal"||this.state.board=="random fractal"){
            let p=this.state.board=="fractal"? 0:0.2;
            for(let i=0;i<H;i++) for(let j=0;j<W;j++) this.setVal(i,j,Math.random()<p? 30000: 0);
            let dx=[1,0,-1,0],dy=[0,1,0,-1],toV=[],num=Array(H).fill().map(()=>Array(W).fill(0)),cur=0;
            toV.push([0,0]);
            while(cur<toV.length){
                let x=toV[cur][0],y=toV[cur][1]; cur++;
                if(num[x][y]>1&&Math.random()>p&&0<x&&x<H-1&&0<y&&y<W-1){
                    this.setVal(x,y,30000);
                    continue;
                }
                num[x][y]++;
                for(let i=0;i<4;i++) if(0<=x+dx[i]&&x+dx[i]<H&&0<=y+dy[i]&&y+dy[i]<W&&this.state.grid[x+dx[i]][y+dy[i]]!=30000){
                    num[x+dx[i]][y+dy[i]]++;
                    if(num[x+dx[i]][y+dy[i]]==1) toV.push([x+dx[i],y+dy[i]]);
                }
            }
        }
        else if(this.state.board=="maze"){
        	let e=[],dsu=new DSU();
        	for(let i=0;i<H;i++) for(let j=0;j<W;j++){
        		this.setVal(i,j,i%2==0&&j%2==0? 0: 30000);
        		if(i%2==0&&j%2==0&&i<H-1) e.push([i,j,0]);
        		if(i%2==0&&j%2==0&&j<W-1) e.push([i,j,1]);
        	}
        	for(let i=e.length-1;i>=0;i--){
        		let x=Math.floor(Math.random()*(i+1)),y=e[x]; e[x]=e[i];
        		if(dsu.link(y[0]*W+y[1],(y[0]+2-2*y[2])*W+y[1]+2*y[2])||Math.random()<0.1) this.setVal(y[0]+1-y[2],y[1]+y[2],0); 
        	}
        }
        else if(this.state.board=="path"||this.state.board=="random path 1"||this.state.board=="random path 2"||this.state.board=="random path 3"){
	        let dx=[1,0,-1,0],dy=[0,1,0,-1],f=Array(H).fill().map(()=>Array(W)),toV=[[0,0]],filled=1,p=0;
	        if(this.state.board=="random path 3") p=1;
	        else if(this.state.board=="random path 2") p=0.1;
	        else if(this.state.board=="random path 1") p=0.01;
	        if(this.state.board!="path") toV=[[Math.floor(Math.random()*H),Math.floor(Math.random()*W)]];
	        while(filled<H*W){
	            let xy=toV.pop(),x=xy[0],y=xy[1],skip=1;
	            for(let i=0;i<4;i++) if(0<=x+dx[i]&&x+dx[i]<H&&0<=y+dy[i]&&y+dy[i]<W&&f[x+dx[i]][y+dy[i]]==null){
		            f[x+dx[i]][y+dy[i]]=30000; toV.push([x+dx[i],y+dy[i]]);
		            filled++; skip=0;
	            }
	            if(skip==1) continue;
	            f[x][y]=0;
	            if(Math.random()<p) for(let i=3;i>=0;i--){
	            	let t=Math.floor(Math.random()*(i+1)),tx=dx[t],ty=dy[t];
	            	dx[t]=dx[i]; dy[t]=dy[i]; dx[i]=tx; dy[i]=ty;
	            }
	        }
	        for(let i=0;i<H;i++) for(let j=0;j<W;j++) this.setVal(i,j,f[i][j]);
        }
        this.updateAll();
    }
    render(){
        return (
          <div>
            <header>
              <h1><a href="index.html">Grid Simulator</a></h1>
              <a href="https://aaerialys.me"><img src={logo} alt="logo" /></a>
            </header>
            <div className="main">
            </div>
            <div>
                <button onClick={() => this.setMark(30000)}>Add Wall</button>
                <button onClick={() => this.setMark(10000)}>Add Source</button>
                <button onClick={() => this.setMark(20000)}>Add Sink</button>
                <label>
                    <button onClick={() => this.setMark(this.state.weight)}>Add empty cell (weighted)</button>
                    <input type="number" value={this.state.weight} onChange={(event) => this.setWeight(event)}/>
                </label>
                <label>
                    <button onClick={() => this.setBoard()}>Set board</button>
                    <select onChange={(event) => this.setBoardOption(event)}>
                        <option value="clear">Clear</option>
                        <option value="random">Random</option>
                        <option value="random weighted">Random weighted</option>
                        <option value="fractal">Fractal</option>
                        <option value="random fractal">Random Fractal</option>
                        <option value="maze">Maze</option>
                        <option value="path">Path</option>
                        <option value="random path 1">Random Path 1</option>
                        <option value="random path 2">Random Path 2</option>
                        <option value="random path 3">Random Path 3</option>
                    </select>
                </label>
                <label>
                    <button onClick={() => this.search(this.state.speed)}>Search</button>
                    <select onChange={(event) => this.setAlgo(event)}>
                        <option value="bfs">bfs</option>
                        <option value="dfs">dfs</option>
                        <option value="dijkstra">dijkstra</option>
                        <option value="spfa">spfa</option>
                        <option value="astar">a*</option>
                    </select>
	                <select value={this.state.speed} onChange={(event) => this.setSpeed(event)}>
	                    <option value={1}>Very Fast</option>
	                    <option value={2}>Fast</option>
	                    <option value={100}>Medium</option>
	                    <option value={500}>Slow</option>
	                </select>
                </label>
                <p>This program simulates pathfinding algorithms on a grid to find the shortest path from any source to sink.</p>
           		<div onMouseDown={() => this.mousePress(1)} onMouseUp={() => this.mousePress(0)}>
	                {display}
	            </div>
            </div>
            <footer>
              <div className="bottom">
                <p>2020 | <a href="https://aaerialys.me">Aaerialys</a></p>
              </div>
            </footer>
          </div>
        );
    }
}

export default App;
