document.querySelector( ".burger" )
  .addEventListener( "click", function() {
      console.log(this);
    this.classList.toggle( "active" );
});

document.querySelector( ".dots" )
  .addEventListener( "click", function() {
      console.log(this);
    this.classList.toggle( "active" );
});