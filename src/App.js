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
            for(let j=0;j<W;j++) row.push(<Cell color={this.state.color[this.props.grid[i][j]]} dragOver={(x) => this.props.dragOver(i,j,x)}/>);
            grid.push(<div>{row}</div>);
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
        };
    }
    setVal(x,y,val){
        var grid2=this.state.grid.slice();
        grid2[x][y]=val;
        this.setState({grid:grid2});
    }
    dragOver(x,y,click){
        if(!click&&!this.state.pressed) return;
        if(this.state.grid[x][y]==this.state.mark) this.setVal(x,y,0);
        else this.setVal(x,y,this.state.mark);
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
        this.bfs(delay);
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
            console.log(x,y);
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
    render(){
        return (
          <div>
            <header>
              <h1><a href="index.html">Grid Simulator</a></h1>
              <a href="https://aaerialys.cf"><img src={logo} alt="logo" /></a>
            </header>
            <div className="main">
                <p>Search algorithm simulator</p>
            </div>
            <div>
                <button onClick={() => this.setMark(3)}>Add Wall</button>
                <button onClick={() => this.setMark(1)}>Add Source</button>
                <button onClick={() => this.setMark(2)}>Add Sink</button>
                <button onClick={() => this.clear()}>Clear</button>
                <button onClick={() => this.search(1)}>Search</button>
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
