import React, { createContext, useState, useContext } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './App.css';

const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const addToCart = (item, quantity) => {
        setCart(prevCart => [...prevCart, { ...item, quantity }]);
    };
    return (
        <CartContext.Provider value={{ cart, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (username) => setUser(username);
    const logout = () => setUser(null);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};


const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};

const Header = () => {
    const { user, logout } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <AuthProvider>
        <header>
            <div className="headerStyle"><Link to="/">REVERIE COFFEE</Link></div>
                <button className="search"></button>
                <button className="menuToggle" onClick={() => setMenuOpen(!menuOpen)}>
                    menu
                </button>
                <div className={`navStyle ${menuOpen ? "open" : ""}`}>
                <nav>
                    <ul>
                        <li><Link to="/novinka">NEW IN</Link></li>
                        <li><Link to="/hits">BESTSELLERS</Link></li>
                        <li><Link to="/brew-your-cup">BREW YOUR CUP</Link></li>
                        <li><Link to="/dostavka">Shipping</Link></li>
                        <li><Link to="/korzina">CART</Link></li>
                        {user ? (
                                <li><button onClick={logout} className="logoutButton">Logout ({user})</button></li>
                        ) : (
                            <li><Link to="/login">Login</Link></li>
                        )}
                    </ul>
                </nav>
            </div>
            </header>
        </AuthProvider>
    );
};

const Home = () => {
    return (
        <main>
            <section className="section">
                <img src="https://i.pinimg.com/736x/11/0a/05/110a057965ff85085daa7f6285ee18f0.jpg" alt="Coffee Beans" className="img" />
                <h2>100+ KINDS OF COFFEE</h2>
            </section>
            <section className="section">
                <img src="https://i.pinimg.com/736x/77/74/18/777418913a928ea7daaac1e224ea0c2d.jpg" alt="Coffee Bubbles" className="img" />
                <h2>COFFEE FROM 50+ COUNTRIES</h2>
            </section>
            <section className="section">
                <img src="https://i.pinimg.com/736x/5b/6c/c7/5b6cc790a5c2b31a81a5cfb136e0b364.jpg" alt="Coffee Cup" className="img" />
                <h2>PARTNERSHIP WITH FAMOUS CAFES</h2>
            </section>
        </main>
    );
};

const NovinkaPage = () => {
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();
    const increaseQuantity = () => setQuantity(quantity + 1);
    const decreaseQuantity = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };
    const product = {
        name: "JIBBY matcha super latte",
        price: 40,
        image: "https://i.pinimg.com/736x/7a/cf/32/7acf32300e50fb3a7af2a840f3da9c2e.jpg"
    };
    return (
        <div>
            <img className="newInImg" src={product.image} alt="Product" />
            <h2 className="new">NEW</h2>
            <div className="newInDesc">
                <h1>{product.name}</h1>
                <h2>${product.price} - 1 package</h2>
                <p>
                    Ceremonial Grade Matcha: Sustainably sourced and Fair Trade Certified.
                    Organic Adaptogenic Mushrooms: For cognitive and immune support.
                    Clean Collagen Infused: Promotes skin elasticity and joint health.
                    Whole Food Ingredients: Natural, with no artificial additives.
                    Third-Party Tested: Ingredients verified for purity and potency.
                    Nutritionist-Developed: Balanced for wellness support.
                </p>
                <div className="atcDiv">
                    <button className="deac" onClick={decreaseQuantity}>-</button>
                    <p className="quantity"><span>{quantity}</span></p>
                    <button className="inc" onClick={increaseQuantity}>+</button>
                </div>
            </div>
            <button className="addToCartNew" onClick={() => addToCart(product, quantity)}>Add to cart</button>
        </div>
    );
};

const HitsPage = () => {
    const { addToCart } = useCart();
    return (
        <div>
            <Card className="card1">
                <Card.Img
                    variant="top"
                    src="https://i.pinimg.com/736x/e5/b4/8c/e5b48cce6f212356e5bdff50b764c095.jpg"
                />
                <Card.Body>
                    <Card.Title>AGF Blendy</Card.Title>
                    <Card.Text>$15 - 1 box</Card.Text>
                    <Button onClick={() => addToCart({ name: "AGF Blendy", price: 15, image: "https://i.pinimg.com/736x/e5/b4/8c/e5b48cce6f212356e5bdff50b764c095.jpg" }, 1)}>
                        add to cart
                    </Button>
                </Card.Body>
            </Card>
            <Card className="card2">
                <Card.Img
                    variant="top"
                    src="https://i.pinimg.com/736x/52/e4/36/52e4364056680acba891bfc51ff834b9.jpg"
                />
                <Card.Body>
                    <Card.Title>INDOxyz</Card.Title>
                    <Card.Text>$40 - 1 package</Card.Text>
                    <Button onClick={() => addToCart({ name: "INDOxyz", price: 40, image: "https://i.pinimg.com/736x/52/e4/36/52e4364056680acba891bfc51ff834b9.jpg" }, 1)}>
                        add to cart
                    </Button>
                </Card.Body>
            </Card>
            <Card className="card3">
                <Card.Img
                    variant="top"
                    src="https://i.pinimg.com/736x/fd/b3/72/fdb372b291b69ef7e6ec2472949e268f.jpg"
                />
                <Card.Body>
                    <Card.Title>Canyone Coffee</Card.Title>
                    <Card.Text>$13 - 1 can</Card.Text>
                    <Button onClick={() => addToCart({ name: "Canyone Coffee", price: 13, image: "https://i.pinimg.com/736x/fd/b3/72/fdb372b291b69ef7e6ec2472949e268f.jpg" }, 1)}>
                        add to cart
                    </Button>
                </Card.Body>
            </Card>
            <Card className="card4">
                <Card.Img
                    variant="top"
                    src="https://i.pinimg.com/736x/1a/d7/33/1ad733d5519b2dd8c2fbdb8078e85458.jpg"
                />
                <Card.Body>
                    <Card.Title>Canyone Coffee</Card.Title>
                    <Card.Text>$15 - 1 can</Card.Text>
                    <Button onClick={() => addToCart({ name: "Canyone Coffee", price: 15, image: "https://i.pinimg.com/736x/1a/d7/33/1ad733d5519b2dd8c2fbdb8078e85458.jpg" }, 1)}>
                        add to cart
                    </Button>
                </Card.Body>
            </Card>
        </div>
    );
};


const BrewYourCupPage = () => (
    <div>
        <div className="bgBrew"></div>
        <h1 className="hBrew">Brew Your Cup!</h1>
        <p className="pBrew">pass the test to get coffee that suits you most ;3</p>
        <a href="https://form.typeform.com/to/REsqfexh"><button className="bBrew">go to test</button></a>
    </div>
);

const pageStyle = {
    padding: '20px',
    textAlign: 'center'
};

const DostavkaPage = () => {
    const [showModal, setShowModal] = useState(false);

    return(
        <div>
            <h1 className="hShipping">Shipping</h1>
            <img src="/map.png" className="mapImage" alt="Map" />
            <div className="shipDesc">
                <h2>Shipping methods:</h2>
                <p className="sM">
                    <span className="interactive" onClick={() => setShowModal(true)}>1)pickup in our stores</span><br />
                    2)courier delivery</p>
                <h3> Additional:</h3>
                <p className="sA">
                    1)The shipping price depends on your country's taxes
                    2)The goods are guaranteed to be delivered within
                    7-10 working days
                    3) A track number is issued when ordering
                </p>
            </div>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Store Locations</h2>
                        <p>1. 123 Coffee St, New York</p>
                        <p>2. 456 Espresso Ave, Los Angeles</p>
                        <p>3. 789 Latte Blvd, Chicago</p>
                        <button onClick={() => setShowModal(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

const AboutPage = () => (
    <div style={pageStyle}>
        <h1>О нас</h1>
        <p>Контент для раздела О нас.</p>
    </div>
);

const QaPage = () => (
    <div style={pageStyle}>
        <h1>Q&A</h1>
        <p>Контент для раздела Q&A.</p>
    </div>
);

const KorzinaPage = () => {
    const { cart } = useCart();
    const { user } = useAuth();
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleOrder = () => {
        if (!user) {
            alert("You must be logged in to place an order!");
            return;
        }
        alert(`Order placed! Total cost: $${total}`);
    };

    return (
        <div>
            <h1 className="hCart">Cart</h1>
            {cart.length === 0 ? (
                <p>Cart is empty</p>
            ) : (
                cart.map((item, index) => (
                    <div key={index} className="cartItem">
                        <img src={item.image} alt={item.name} className="cartImage" />
                        <div>
                            <h2>{item.name}</h2>
                            <p>Quantity: {item.quantity}</p>
                            <p>Cost: ${item.price * item.quantity}</p>
                        </div>
                    </div>
                ))
            )}
            <h1 className="totalHeader">Total: ${total}</h1>
            <button className="orderProducts" onClick={handleOrder}>Order</button>
        </div>
    );
};


const LoginPage = () => {
    const { login } = useAuth();
    const [username, setUsername] = useState("");

    const handleLogin = () => {
        if (username.trim() !== "") {
            login(username);
        }
    };

    return (
        <div>
            <h1 className = "hLogin">Login</h1>
            <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <button onClick={handleLogin}>Log In</button>
        </div>
    );
};


const App = () => {
    return (
        <AuthProvider>
        <CartProvider>
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/novinka" element={<NovinkaPage />} />
                    <Route path="/hits" element={<HitsPage />} />
                    <Route path="/brew-your-cup" element={<BrewYourCupPage />} />
                    <Route path="/dostavka" element={<DostavkaPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/qa" element={<QaPage />} />
                    <Route path="/korzina" element={<KorzinaPage />} />
                    <Route path="/login" element={<LoginPage />} />
                </Routes>
            </Router>
            </CartProvider>
        </AuthProvider>
    );
};

export default App;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
