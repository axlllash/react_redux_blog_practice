const
  path = require('path'),
  express = require('express'),
  redis = require('redis'),
  client = redis.createClient({ password: '123456ww' }),
  bodyParser = require('body-parser'),
  session = require('express-session'),
  redisStore = require('connect-redis')(session),
  app = express(),

  //一些全局参数
  sessionOptions = {
    ciient: client,
    port: 6379,
    host: '127.0.0.1',
    logErrors: true,
    db: 2,
    pass: '123456ww'
  };

//用于redis提示错误信息
client.on('error', function(err) {
  console.log('Error:' + err);
})

app.use(session({
  store: new redisStore(sessionOptions),
  secret: 'zhy2019',
  resave: true,
  saveUninitialized: false,
  // 30分钟
  cookie: {
    maxAge: 1000 * 60 * 30,
    path: '/',
    secure: false
  },
}));

//配置基础中间件
app.use(express.static(path.join(__dirname, 'static')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//配置个人中间件
app.use((req, res, next) => {
  console.log('请求url' + req.originalUrl);
  console.log(req.body);
  next();
})

app.get('/', (req, res) => {
  let
    options = {
      root: __dirname + '/static/',
      dotfiles: 'deny',
      headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
      }
    };

  res.sendFile('index', options, function() {
    if (err) {
      next(err);
    }
  })
});

app.get('/api/login', (req, res, next) => {
  if (!req.session.userName) {
    res.send(JSON.stringify({ code: 0 }));
  } else {
    res.send(JSON.stringify({ code: 1, userName: req.session.userName }));
  }
});

app.post('/api/login', (req, res, next) => {
  if (req.body.userName && req.body.password) {
    client.hget(`user:${req.body.userName}`, 'password', function(err, password) {
      if (req.body.password === password) {
        req.session.userName = req.body.userName;
        res.send(JSON.stringify({ code: 1, userName: req.body.userName }));
      } else {
        res.send(JSON.stringify({ code: 2 }));
      }
    })
  }
});

app.get('/api/logout', (req, res, next) => {
  if (req.session.userName) {
    req.session.userName = '';
    res.send(JSON.stringify({code:1}));
  }else{
    res.send(JSON.stringify({code:0}));
  }
});

app.post('/api/register', (req, res, next) => {
  let
    userName = req.body.userName,
    password1 = req.body.password1,
    password2 = req.body.password2;

  if (!userName || !password1 || !password2 || password1 !== password2) {
    res.send(JSON.stringify({ code: 3 }));
  }

  client.hget(`user:${userName}`, 'userName', (err, userName) => {
    if (err) {
      next(err);
    }
    console.log(userName);
    if (userName) {

      res.send(JSON.stringify({ code: 4 }));
    } else {
      client.hmset(`user:${req.body.userName}`, 'userName', req.body.userName, 'password', password1, (err) => {
        if (!err) {
          console.log('成功创建账户' + req.body.userName);
          res.send(JSON.stringify({ code: 1 }));
        }
      });
    }
  });
});

app.get('/api/blog', (req, res, next) => {
  if (!req.session.userName) {
    res.send(JSON.stringify({ code: 5 }));
  } else {
    client.hgetall('blog:temp', (err, result) => {
      if (err) {
        next(err);
      }
      if (result) {
        console.log(result);
        res.send(JSON.stringify({ blogs: result, code: 1 }));
      } else {
        res.send(JSON.stringify({ code: 7 }));
      }
    });
  }
});

app.post('/api/blog', (req, res, next) => {
  let
    title = req.body.title,
    content = req.body.content,
    date = Date.now(),
    author = req.body.author;

  if (!req.session.userName) {
    res.send(JSON.stringify({ code: 5 }));
  } else if (!title || !content) {
    res.send(JSON.stringify({ code: 6 }));
  } else {
    client.incr('blog:ids', (err, id) => {
      if (!err && id) {
        client.hmset(`blog:${id}`, 'id', id, 'title', title, 'content', content, 'author', author, 'date', date);
        client.hset('blog:temp', id, JSON.stringify({ id: id, title: title, date: date, author: author }));
        res.send(JSON.stringify({ code: 1 }));
      } else if (!err) {
        res.send(JSON.stringify({ code: 7 }));
      } else {
        next(err);
      }
    });
  }
});

app.get('/api/blog/:id', (req, res, next) => {
  let
    id = req.params.id,
    db_result;

  if (!req.session.userName) {
    res.send(JSON.stringify({ code: 5 }));
  } else {
    client.hgetall(`blog:${id}`, (err, result) => {
      if (err) {
        next(err);
      }
      if (result) {
        res.send(JSON.stringify({ blog: result, code: 1 }));
      } else {
        res.send(JSON.stringify({ code: 7 }));
      }
    });
  }
});


//访问不存在的路由的时候返回首页
app.get('*',(req,res,next)=>{
  res.redirect('/');
});
app.listen(80);