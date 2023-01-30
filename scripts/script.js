const cel = (tag, text) => {
    const e = document.createElement(tag);
    e.append(document.createTextNode(text));
    return e;
  };
  
  const list = (codetext, text) => {
    const e = document.createElement('li');
    const code = document.createElement('code');
    code.append(codetext)
    e.append(code)
    e.append(
      document.createTextNode(text)
    );
    return e
  }
  
  
  // Get a reference to the object representing the BODY element so we can append stuff to it.
  const body = document.querySelector('body');
  
  body.append(cel('h1','Can you tell me why HTML was developed?'));
  
  body.append(cel('p',`
  HTML (Hypertext Markup Language) was developed to create a standard way to
   create and structure documents on the World Wide Web. It allows developers to
   create structured documents, including headings, paragraphs, images and links,
   that can be displayed in a web browser. It was created to simplify the process
   of creating and sharing documents online, so that anyone can create and view
   web pages with a consistent look and feel.
  `))
  body.append(cel('h1','What about using HTML for GUIs?'))
  
  body.append(cel('p',`
  HTML can be used to create user interfaces for web applications, but it is primarily designed
        as a markup language for creating structured documents to be displayed in web browsers. While
        it can be used to create basic user interfaces, it is not typically considered a good choice
        for creating complex, interactive user interfaces. Other technologies such as JavaScript and
        CSS are typically used in conjunction with HTML to create more advanced user interfaces for
        web applications. Additionally, there are other technologies such as Electron, React Native
        and NativeScript that allow to create cross-platform desktop and mobile apps using web
        technologies such as HTML, CSS, and JavaScript.
  `))
  
  body.append(cel('h1','What are some of the main elements of HTML?'))
  
  body.append(cel('p','Some of the main elements of HTML include:'))
  const a3 = document.createElement('ol');
  a3.append(list('<html>',`: This is the root element of an HTML document, and it contains all of the other elements.`))
  a3.append(list('<head>',`: This element contains information about the document, such as the title of the page, which is displayed in the browser's title bar or tab.`))
  a3.append(list(`<body>`,`: This element contains the content of the document that is displayed in the browser window.`))
  a3.append(list(`<h1> to <h6>`,`: These elements are used for headings and subheadings. <h1> is the highest level heading, while <h6> is the lowest.`))
  a3.append(list(`<p>`,`This element is used for paragraphs of text.`))
  a3.append(list(`<a>`,`This element is used for hyperlinks, which allow users to navigate between pages on the web.`))
  a3.append(list(`<img>`,`: This element is used to embed images in a web page.`))
  a3.append(list(`<ul> and <ol>`,`: These elements are used for unordered and ordered lists, respectively.`))
  a3.append(list(`<li>`,`: This element is used for list items.`))
  a3.append(list(`<div> and <span>`,`: These elements are used for grouping and applying styles to elements on a web page.`))
  
  const a3text = document.createElement('p');
  a3text.append(
    document.createTextNode(`These are some of the main elements, but there are many more available, like `)
  )
  const codetext1 = document.createElement('code');
  const codetext2 = document.createElement('code');
  const codetext3 = document.createElement('code');
  const codetext4 = document.createElement('code');
  const codetext5 = document.createElement('code');
  const codetext6 = document.createElement('code');
  const codetext7 = document.createElement('code');
  codetext1.append(` <header>`)
  codetext2.append(` <nav>`)
  codetext3.append(` <main>`)
  codetext4.append(` <footer>`)
  codetext5.append(` <form>`)
  codetext6.append(` <input>`)
  codetext7.append(` <select>`)
  a3text.append(codetext1)
  a3text.append(document.createTextNode(`,`))
  a3text.append(codetext2)
  a3text.append(document.createTextNode(`,`))
  a3text.append(codetext3)
  a3text.append(document.createTextNode(`,`))
  a3text.append(codetext4)
  a3text.append(document.createTextNode(`,`))
  a3text.append(codetext5)
  a3text.append(document.createTextNode(`,`))
  a3text.append(codetext6)
  a3text.append(document.createTextNode(`,`))
  a3text.append(codetext7)
  a3text.append(
    document.createTextNode(`
    , etc.
    `)
  )
  body.append(a3);
  body.append(a3text)
  
  const q4 = document.createElement('h1');
  
  q4.append(document.createTextNode('Can you find a picture of the inventor of the web?'));
  
  body.append(q4);
  
  const a4 = document.createElement('p');
    document.createTextNode(`
    
    I'm sorry, I am a text based model and I am not able to find or show images. However, I can
        tell you that the inventor of the World Wide Web (WWW) is Sir Tim Berners-Lee. He is a British
        computer scientist and is considered to be the inventor of the World Wide Web. He proposed and
        developed the first successful communication between a Hypertext Transfer Protocol (HTTP)
        client and server via the Internet in 1989. He also created the first web browser, called
        WorldWideWeb, and the first web server, called httpd. He also wrote the first version of the
        HTML language, which provided the structure for web pages. He is currently working on a
        decentralized web project called Solid.
    `)
  );
  
  body.append(a4);
  const creditsall = document.createElement('div')
  const credits = document.createElement('p');
  const chatgptcredits = document.createElement('p');
  const hyperlink = document.createElement('a');
  const superhyperlink = document.createElement('a');
  const cc = document.createElement('a');
  chatgptcredits.append(
    document.createTextNode(`
  Text from 2023-01-14 conversation with 
  `))
  hyperlink.setAttribute('href','https://chat.openai.com/chat')
  hyperlink.append(document.createTextNode(`ChatGPT`))
  chatgptcredits.append(hyperlink)
  credits.append(
    document.createTextNode(`
    Photo of a young Tim Berners-Lee from 
    `)
  )
  superhyperlink.setAttribute('href','https://www.flickr.com/photos/itupictures/16662336315')
  superhyperlink.append(document.createTextNode(`
  Flickr
  `))
  credits.append(superhyperlink)
  credits.append(document.createTextNode(` no thanks to ChatGPT. `))
  cc.setAttribute('href','https://creativecommons.org/licenses/by/2.0/')
  cc.append(document.createTextNode(`(CC BY 2.0)`))
  credits.append(cc)
  credits.append(document.createTextNode(`.`))
  creditsall.setAttribute('class','credits')
  creditsall.append(chatgptcredits)
  creditsall.append(credits)
  body.append(creditsall)
  