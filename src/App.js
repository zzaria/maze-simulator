import React from 'react';
import './App.css';
import logo from './assets/images/logo.ico'

var H=Math.floor(window.screen.height/25)-12,W=Math.floor(window.screen.width/25)-1;

function Cell(props){
    return(
        <div className="cell" style={{backgroundColor: props.color}} onMouseOver={() => props.dragOver(0)} onMouseDown={() => props.dragOver(1)}>
            
        </div>
    );
}

class Grid extends React.Component{
    constructor(props){
        super(props);
        this.state={
            color: ["white", "lime", "red", "black", "#f37fff", "#bf49ff","gold"],
        }
    }
    render(){
        var grid=[];
        for(let i=0;i<H;i++){
            var row=[];
            for(let j=0;j<W;j++){
                if(this.props.grid[i][j]>=0) row.push(<Cell key={i*W+j} color={this.state.color[this.props.grid[i][j]]} dragOver={(x) => this.props.dragOver(i,j,x)}/>);
                else{
                    var col=Math.max(0,256-Math.floor(Math.log2(1-this.props.grid[i][j])*20)).toString(16);
                    while(col.length<2) col="0"+col;
                    row.push(<Cell key={i*W+j} color={"#"+col+col+col} dragOver={(x) => this.props.dragOver(i,j,x)}/>);
                }
            }
            grid.push(<div key={i}>{row}</div>);
        }
        return(
            <div onMouseDown={() => this.props.mousePress(1)} onMouseUp={() => this.props.mousePress(0)}>
                {grid}
            </div>
        );
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
        };
    }
    setVal(x,y,val){
        var grid2=this.state.grid.slice();
        grid2[x][y]=val;
        this.setState({grid:grid2});
    }
    dragOver(x,y,click){
        if(!click&&!this.state.pressed) return;
        this.setVal(x,y,this.state.mark);
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
    clear() {
        var stop2=this.state.stop.slice(); stop2[this.state.fid-1]=1; this.setState({stop:stop2});
        for(let i=0;i<H;i++) for(let j=0;j<W;j++) this.setVal(i,j,0);
    }
    search(delay){
        var stop2=this.state.stop.slice(); stop2[this.state.fid-1]=1; this.setState({stop:stop2});
        if(this.state.algo=="bfs") this.bfs(delay);
        else if(this.state.algo=="dfs") this.dfs(delay);
        else if(this.state.algo=="dijkstra") this.dijkstra(delay);
        else if(this.state.algo=="spfa") this.spfa(delay);
        else if(this.state.algo=="astar") this.astar(delay);
    }
    async bfs(delay){
        var dx=[1,0,-1,0],dy=[0,1,0,-1],p=Array(H).fill().map(()=>Array(W)),toV=[],cur=0,id=this.state.fid; this.setState({fid:id+1});
        for(let i=0;i<H;i++) for(let j=0;j<W;j++){
            if(this.state.grid[i][j]>3) this.setVal(i,j,0);
            else if(this.state.grid[i][j]==1){
                p[i][j]=-1; toV.push([i,j]);
            }
            else if(this.state.grid[i][j]==3) p[i][j]=-1;
        }
        while(cur<toV.length){
            if(this.state.stop[id]==1) break;
            let x=toV[cur][0],y=toV[cur][1]; cur++;
            if(this.state.grid[x][y]==2){
                while(p[x][y]!=-1){
                    if(this.state.stop[id]==1) break;
                    if(this.state.grid[x][y]==5) this.setVal(x,y,6);
                    let d=p[x][y]; x-=dx[d]; y-=dy[d];
                    if(delay) await this.sleep(delay);
                }
                break;
            }
            else if(this.state.grid[x][y]==4) this.setVal(x,y,5);
            for(let i=0;i<4;i++) if(0<=x+dx[i]&&x+dx[i]<H&&0<=y+dy[i]&&y+dy[i]<W&&p[x+dx[i]][y+dy[i]]==null){
                p[x+dx[i]][y+dy[i]]=i; toV.push([x+dx[i],y+dy[i]]);
                if(this.state.grid[x+dx[i]][y+dy[i]]==0) this.setVal(x+dx[i],y+dy[i],4);
            }
            if(delay) await this.sleep(delay);
        }
    }
    async dfs(delay){
        var dx=[1,0,-1,0],dy=[0,1,0,-1],p=Array(H).fill().map(()=>Array(W)),toV=[],cur=0,id=this.state.fid; this.setState({fid:id+1});
        for(let i=0;i<H;i++) for(let j=0;j<W;j++){
            if(this.state.grid[i][j]>3) this.setVal(i,j,0);
            else if(this.state.grid[i][j]==1){
                p[i][j]=-1; toV.push([i,j]);
            }
            else if(this.state.grid[i][j]==3) p[i][j]=-1;
        }
        while(toV.length>0){
            if(this.state.stop[id]==1) break;
            let xy=toV.pop(),x=xy[0],y=xy[1];
            if(this.state.grid[x][y]==2){
                while(p[x][y]!=-1){
                    if(this.state.stop[id]==1) break;
                    if(this.state.grid[x][y]==5) this.setVal(x,y,6);
                    let d=p[x][y]; x-=dx[d]; y-=dy[d];
                    if(delay) await this.sleep(delay);
                }
                break;
            }
            else if(this.state.grid[x][y]==4) this.setVal(x,y,5);
            for(let i=0;i<4;i++) if(0<=x+dx[i]&&x+dx[i]<H&&0<=y+dy[i]&&y+dy[i]<W&&p[x+dx[i]][y+dy[i]]==null){
                p[x+dx[i]][y+dy[i]]=i; toV.push([x+dx[i],y+dy[i]]);
                if(this.state.grid[x+dx[i]][y+dy[i]]==0) this.setVal(x+dx[i],y+dy[i],4);
            }
            if(delay) await this.sleep(delay);
        }
    }
    async dijkstra(delay){
        var dx=[1,0,-1,0],dy=[0,1,0,-1],p=Array(H).fill().map(()=>Array(W)),d=Array(H).fill().map(()=>Array(W).fill(1e9)),toV=[],id=this.state.fid; this.setState({fid:id+1});
        for(let i=0;i<H;i++) for(let j=0;j<W;j++){
            if(this.state.grid[i][j]>3) this.setVal(i,j,0);
            else if(this.state.grid[i][j]==1){
                p[i][j]=-1; toV.push([i,j]); d[i][j]=0;
            }
            else if(this.state.grid[i][j]==3){
                p[i][j]=-1; d[i][j]=0;
            }
        }
        while(toV.length>0){
            if(this.state.stop[id]==1) break;
            let cur=0;
            for(let i=0;i<toV.length;i++) if(d[toV[i][0]][toV[i][1]]<d[toV[cur][0]][toV[cur][1]]) cur=i;
            let x=toV[cur][0],y=toV[cur][1]; toV.splice(cur,1);
            if(this.state.grid[x][y]==2){
                while(p[x][y]!=-1){
                    if(this.state.stop[id]==1) break;
                    if(this.state.grid[x][y]==5) this.setVal(x,y,6);
                    let dir=p[x][y]; x-=dx[dir]; y-=dy[dir];
                    if(delay) await this.sleep(delay);
                }
                break;
            }
            else if(this.state.grid[x][y]==4) this.setVal(x,y,5);
            for(let i=0;i<4;i++) if(0<=x+dx[i]&&x+dx[i]<H&&0<=y+dy[i]&&y+dy[i]<W){
                if(p[x+dx[i]][y+dy[i]]==null){
                    p[x+dx[i]][y+dy[i]]=i; toV.push([x+dx[i],y+dy[i]]);
                    if(this.state.grid[x+dx[i]][y+dy[i]]==0) this.setVal(x+dx[i],y+dy[i],4);
                }
                if(d[x+dx[i]][y+dy[i]]>d[x][y]-Math.min(0,this.state.grid[x+dx[i]][y+dy[i]])+1) d[x+dx[i]][y+dy[i]]=d[x][y]-Math.min(0,this.state.grid[x+dx[i]][y+dy[i]])+1;
            }
            if(delay) await this.sleep(delay);
        }
    }
    async spfa(delay){
        var dx=[1,0,-1,0],dy=[0,1,0,-1],p=Array(H).fill().map(()=>Array(W)),d=Array(H).fill().map(()=>Array(W).fill(1e9)),toV=[],id=this.state.fid; this.setState({fid:id+1});
        for(let i=0;i<H;i++) for(let j=0;j<W;j++){
            if(this.state.grid[i][j]>3) this.setVal(i,j,0);
            else if(this.state.grid[i][j]==1){
                p[i][j]=-1; toV.push([i,j]); d[i][j]=0;
            }
            else if(this.state.grid[i][j]==3){
                p[i][j]=-1; d[i][j]=0;
            }
        }
        while(toV.length>0){
            if(this.state.stop[id]==1) break;
            let x=toV[0][0],y=toV[0][1]; toV.splice(0,1);
            if(this.state.grid[x][y]==2){
                while(p[x][y]!=-1){
                    if(this.state.stop[id]==1) break;
                    if(this.state.grid[x][y]==5) this.setVal(x,y,6);
                    let dir=p[x][y]; x-=dx[dir]; y-=dy[dir];
                    if(delay) await this.sleep(delay);
                }
                break;
            }
            else if(this.state.grid[x][y]==4) this.setVal(x,y,5);
            for(let i=0;i<4;i++) if(0<=x+dx[i]&&x+dx[i]<H&&0<=y+dy[i]&&y+dy[i]<W){
                if(d[x+dx[i]][y+dy[i]]>d[x][y]-Math.min(0,this.state.grid[x+dx[i]][y+dy[i]])+1){
                    d[x+dx[i]][y+dy[i]]=d[x][y]-Math.min(0,this.state.grid[x+dx[i]][y+dy[i]])+1;
                    p[x+dx[i]][y+dy[i]]=i; toV.push([x+dx[i],y+dy[i]]);
                    if(this.state.grid[x+dx[i]][y+dy[i]]==0) this.setVal(x+dx[i],y+dy[i],4);
                }
            }
            if(delay) await this.sleep(delay);
        }
    }
    async astar(delay){
        var dx=[1,0,-1,0],dy=[0,1,0,-1],p=Array(H).fill().map(()=>Array(W)),d=Array(H).fill().map(()=>Array(W).fill(1e9)),d2=Array(H).fill().map(()=>Array(W).fill(1e9)),toV=[],id=this.state.fid; this.setState({fid:id+1});
        for(let i=0;i<H;i++) for(let j=0;j<W;j++){
            if(this.state.grid[i][j]>3) this.setVal(i,j,0);
            else if(this.state.grid[i][j]==1){
                p[i][j]=-1; toV.push([i,j]); d[i][j]=0;
            }
            else if(this.state.grid[i][j]==2){
                for(let ii=0;ii<H;ii++) for(let jj=0;jj<W;jj++) d2[ii][jj]=Math.min(d2[ii][jj],Math.abs(ii-i)+Math.abs(jj-j));
            }
            else if(this.state.grid[i][j]==3){
                p[i][j]=-1; d[i][j]=0;
            }
        }
        while(toV.length>0){
            if(this.state.stop[id]==1) break;
            let cur=0,x=toV[cur][0],y=toV[cur][1];
            for(let i=0;i<toV.length;i++) if(d[toV[i][0]][toV[i][1]]+d2[toV[i][0]][toV[i][1]]<=d[x][y]+d2[x][y]){
                cur=i; x=toV[i][0]; y=toV[i][1];
            }
            toV.splice(cur,1);
            if(this.state.grid[x][y]==2){
                while(p[x][y]!=-1){
                    if(this.state.stop[id]==1) break;
                    if(this.state.grid[x][y]==5) this.setVal(x,y,6);
                    let dir=p[x][y]; x-=dx[dir]; y-=dy[dir];
                    if(delay) await this.sleep(delay);
                }
                break;
            }
            else if(this.state.grid[x][y]==4) this.setVal(x,y,5);
            for(let i=0;i<4;i++) if(0<=x+dx[i]&&x+dx[i]<H&&0<=y+dy[i]&&y+dy[i]<W){
                if(p[x+dx[i]][y+dy[i]]==null){
                    p[x+dx[i]][y+dy[i]]=i; toV.push([x+dx[i],y+dy[i]]);
                    if(this.state.grid[x+dx[i]][y+dy[i]]==0) this.setVal(x+dx[i],y+dy[i],4);
                }
                if(d[x+dx[i]][y+dy[i]]>d[x][y]-Math.min(0,this.state.grid[x+dx[i]][y+dy[i]])+1) d[x+dx[i]][y+dy[i]]=d[x][y]-Math.min(0,this.state.grid[x+dx[i]][y+dy[i]])+1;
            }
            if(delay) await this.sleep(delay);
        }
    }
    setWeight(event){
        var w=Math.max(0,Math.min(10000,event.target.value));
        this.setState({weight:-w});
        this.setMark(-w);
    }
    setAlgo(event){
        this.setState({algo:event.target.value});
    }
    render(){
        document.title="Aaerialys | Grid Simulator"
        return (
          <div>
            <header>
              <h1><a href="index.html">Grid Simulator</a></h1>
              <a href="https://aaerialys.cf"><img src={logo} alt="logo" /></a>
            </header>
            <div className="main">
            </div>
            <div>
                <button onClick={() => this.setMark(3)}>Add Wall</button>
                <button onClick={() => this.setMark(1)}>Add Source</button>
                <button onClick={() => this.setMark(2)}>Add Sink</button>
                <button onClick={() => this.clear()}>Clear</button>
                <label>
                    <button onClick={() => this.setMark(this.state.weight)}>Add empty cell (weighted)</button>
                    <input type="number" value={-this.state.weight} onChange={(event) => this.setWeight(event)}/>
                </label>
                <label>
                    <button onClick={() => this.search(1)}>Search</button>
                    <select onChange={(event) => this.setAlgo(event)}>
                        <option value="bfs">bfs</option>
                        <option value="dfs">dfs</option>
                        <option value="dijkstra">dijkstra</option>
                        <option value="spfa">spfa</option>
                        <option value="astar">a*</option>
                    </select>
                </label>
                <p>This program simulates pathfinding algorithms on a grid to find the shortest path from any source to sink.</p>
                <Grid grid={this.state.grid} mousePress={(x) => this.mousePress(x)} dragOver={(x,y,click) => this.dragOver(x,y,click)}/>
            </div>
            <footer>
              <div className="bottom">
                <p>2020 | <a href="https://aaerialys.cf">Aaerialys</a></p>
              </div>
            </footer>
          </div>
        );
    }
}

export default App;
