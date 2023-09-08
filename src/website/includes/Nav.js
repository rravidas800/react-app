import React from "react";

const Nav=({navstyle})=>{
    return (<>
    <div className={`${navstyle["container-fluid"]} ${navstyle["mb-5"]}`}>
        <div className={`${navstyle["row"]} ${navstyle["border-top"]} ${navstyle["px-xl-5"]}`}>
            <div className={`${navstyle["col-lg-3"]} ${navstyle["d-none"]} ${navstyle["d-lg-block"]}`}>
                <a className={`${navstyle["btn"]} ${navstyle["shadow-none"]} ${navstyle["d-flex"]} ${navstyle["align-items-center"]} ${navstyle["justify-content-between"]} ${navstyle["bg-primary"]} ${navstyle["text-white"]} ${navstyle["w-100"]}`} data-toggle="collapse" href="#navbar-vertical" style={{"height":"65px","marginTop":"-1px","padding":"0 30px"}}>
                    <h6 className={navstyle["m-0"]}>Categories</h6>
                    <i className={`fa fa-angle-down ${navstyle["text-dark"]}`}></i>
                </a>
                <nav className={`${navstyle["collapse"]} ${navstyle['show']} ${navstyle['navbar']} ${navstyle['navbar-vertical']} ${navstyle['navbar-light']} ${navstyle['align-items-start']} ${navstyle['p-0']} ${navstyle['border']} ${navstyle['border-top-0']} ${navstyle['border-bottom-0']}`} id="navbar-vertical">
                    <div className={`${navstyle["navbar-nav"]} ${navstyle["w-100"]} ${navstyle["overflow-hidden"]}`} style={{height:"410px"}}>
                        <div className={`${navstyle["nav-item"]} ${navstyle["dropdown"]}`}>
                            <a href="#" className={navstyle["nav-link"]} data-toggle="dropdown">Dresses <i className="fa fa-angle-down float-right mt-1"></i></a>
                            <div className={`${navstyle["dropdown-menu"]} ${navstyle["position-absolute"]} ${navstyle["bg-secondary"]} ${navstyle["border-0"]} ${navstyle["rounded-0"]} ${navstyle["w-100"]} ${navstyle["m-0"]}`}>
                                <a href="" className={navstyle["dropdown-item"]}>Men's Dresses</a>
                                <a href="" className={navstyle["dropdown-item"]}>Women's Dresses</a>
                                <a href="" className={navstyle["dropdown-item"]}>Baby's Dresses</a>
                            </div>
                        </div>
                        <a href="" className={`${navstyle["nav-item"]} ${navstyle["nav-link"]}`}>Shirts</a>
                        <a href="" className={`${navstyle["nav-item"]} ${navstyle["nav-link"]}`}>Jeans</a>
                        <a href="" className={`${navstyle["nav-item"]} ${navstyle["nav-link"]}`}>Swimwear</a>
                        <a href="" className={`${navstyle["nav-item"]} ${navstyle["nav-link"]}`}>Sleepwear</a>
                        <a href="" className={`${navstyle["nav-item"]} ${navstyle["nav-link"]}`}>Sportswear</a>
                        <a href="" className={`${navstyle["nav-item"]} ${navstyle["nav-link"]}`}>Jumpsuits</a>
                        <a href="" className={`${navstyle["nav-item"]} ${navstyle["nav-link"]}`}>Blazers</a>
                        <a href="" className={`${navstyle["nav-item"]} ${navstyle["nav-link"]}`}>Jackets</a>
                        <a href="" className={`${navstyle["nav-item"]} ${navstyle["nav-link"]}`}>Shoes</a>
                    </div>
                </nav>
            </div>
           

            <div className={navstyle["col-lg-9"]}>
                <nav className={`${navstyle["navbar"]} ${navstyle["navbar-expand-lg"]} ${navstyle["bg-light"]} ${navstyle["navbar-light"]} ${navstyle["py-3"]} ${navstyle["py-lg-0"]} ${navstyle["px-0"]}`}>
                    <a href="" className={`${navstyle["text-decoration-none"]} ${navstyle["d-block"]} ${navstyle["d-lg-none"]}`}>
                        <h1 className={`${navstyle["m-0"]} ${navstyle["display-5"]} ${navstyle["font-weight-semi-bold"]}`}><span className={`${navstyle["text-primary"]} ${navstyle["font-weight-bold"]} ${navstyle["border"]} ${navstyle["px-3 mr-1"]}`}>E</span>Shopper</h1>
                    </a>
                    <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                        <div className="navbar-nav mr-auto py-0">
                            <a href="index.html" className="nav-item nav-link active">Home</a>
                            <a href="shop.html" className="nav-item nav-link">Shop</a>
                            <a href="detail.html" className="nav-item nav-link">Shop Detail</a>
                            <div className="nav-item dropdown">
                                <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">Pages</a>
                                <div className="dropdown-menu rounded-0 m-0">
                                    <a href="cart.html" className="dropdown-item">Shopping Cart</a>
                                    <a href="checkout.html" className="dropdown-item">Checkout</a>
                                </div>
                            </div>
                            <a href="contact.html" className="nav-item nav-link">Contact</a>
                        </div>
                        <div className="navbar-nav ml-auto py-0">
                            <a href="" className="nav-item nav-link">Login</a>
                            <a href="" className="nav-item nav-link">Register</a>
                        </div>
                    </div>
                </nav>
                <div id="header-carousel" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active" style={{"height":"410px"}}>
                            <img className="img-fluid" src="img/carousel-1.jpg" alt="Image"/>
                            <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                <div className="p-3" style={{"maxWidth":"700px"}}>
                                    <h4 className="text-light text-uppercase font-weight-medium mb-3">10% Off Your First Order</h4>
                                    <h3 className="display-4 text-white font-weight-semi-bold mb-4">Fashionable Dress</h3>
                                    <a href="" className="btn btn-light py-2 px-3">Shop Now</a>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item" style={{"height":"410px"}}>
                            <img className="img-fluid" src="img/carousel-2.jpg" alt="Image"/>
                            <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                <div className="p-3" style={{"maxWidth":"700px"}}>
                                    <h4 className="text-light text-uppercase font-weight-medium mb-3">10% Off Your First Order</h4>
                                    <h3 className="display-4 text-white font-weight-semi-bold mb-4">Reasonable Price</h3>
                                    <a href="" className="btn btn-light py-2 px-3">Shop Now</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <a className="carousel-control-prev" href="#header-carousel" data-slide="prev">
                        <div className="btn btn-dark" style={{width:"45px",height:"45px"}}>
                            <span className="carousel-control-prev-icon mb-n2"></span>
                        </div>
                    </a>
                    <a className="carousel-control-next" href="#header-carousel" data-slide="next">
                        <div className="btn btn-dark" style={{"width":"45px","height":"45px"}}>
                            <span className="carousel-control-next-icon mb-n2"></span>
                        </div>
                    </a>
                </div>
            </div>



           
        </div>
    </div>
   

    
    </>)
}

export default Nav;