```
function setColor(color){
  document.querySelector('body').style.backgroundColor = color
  document.querySelector('.rsg--root-1').style.backgroundColor = color
}


<IntersectionVisible
  onIntersect={(entries) => console.log(entries)}
  onShow={() => setColor('#FFA0FD')}
  onHide={() => setColor('#FFE1EA')}
  className="element"
>
  <div style={{
    height: '500', 
    backgroundColor: '#C2D076', 
    width: '500',
    color: '#001514',
    fontSize: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }}>
    The background color of the body changes depending on the visibility of this box.
    Scroll to see!
  </div>
</IntersectionVisible>
```

