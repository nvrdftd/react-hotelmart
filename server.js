var express = require('express'),
    path = require('path'),
    app = express();

app.use(express.static('./build'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './build', 'index.html'));
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${this.address().port}`);
});
