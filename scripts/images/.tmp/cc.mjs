import sharp from "sharp";
const [src, L, T, W, H, thr] = process.argv.slice(2);
const _t=+(thr??200); const left=+L, top=+T, width=+W, height=+H, threshold=Math.abs(_t), inv=_t<0;
const g = await sharp(src).extract({left,top,width,height}).greyscale().raw().toBuffer();
const lab = new Int32Array(width*height).fill(-1);
const boxes = [];
const stack = [];
for (let i=0;i<width*height;i++){
  if (lab[i]!==-1 || (inv ? g[i]<=threshold : g[i]>=threshold)) continue;
  const id = boxes.length;
  let minx=width,maxx=0,miny=height,maxy=0,n=0;
  stack.push(i); lab[i]=id;
  while(stack.length){
    const p = stack.pop(); const x=p%width, y=(p/width)|0;
    n++; if(x<minx)minx=x; if(x>maxx)maxx=x; if(y<miny)miny=y; if(y>maxy)maxy=y;
    for(const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]){
      const nx=x+dx, ny=y+dy;
      if(nx<0||ny<0||nx>=width||ny>=height) continue;
      const q=ny*width+nx;
      if(lab[q]===-1 && (inv ? g[q]>threshold : g[q]<threshold)){ lab[q]=id; stack.push(q); }
    }
  }
  boxes.push({n,minx,maxx,miny,maxy});
}
boxes.sort((a,b)=>b.n-a.n);
for(const b of boxes.slice(0,8)){
  console.log(`px=${b.n}  src box: left=${left+b.minx} top=${top+b.miny} w=${b.maxx-b.minx+1} h=${b.maxy-b.miny+1}   (local ${b.minx},${b.miny} - ${b.maxx},${b.maxy})`);
}
