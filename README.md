# Start dev version

```
git clone git@github.com:bobintornado/anycopy-ui-demo.git
cd anycopy-ui-demo
bower install 	# this is to install bower component
npm install 	# this is to install common js libs
gulp 			# default task is to serve development copy
```

# Basic Info

A Redux + React front-end app.

Back-end on Parse.

# Automation

Gulp + Webpack

# Automation Broken Parts

1. Webpack is currently not reloading scripts after changes (so after changes one need to manually ctrl+c and gulp again) (This is probably a configuration issue, but could also be a webpack bug, since there are other cases on the internet also, more investigation needed)
2. Cause browserSync and webpack-dev-server both require inverse proxy, I haven't figured out a solution to make them work together yet

# Build/Deploy Script 

change some stuff and make sure it works, then run

```
gulp build
```

After build commit changes to master branch

```
git add -A
git commit -m "update"
git push
```

Lastly push dist folder to gh-pages branch to link up production

```
git subtree push --prefix dist origin gh-pages
```

# Optional Deploy Optimization

This is optional and will not affect production functionality

remove 

```
<script type=text/javascript src=http://localhost:8080/dist/bundle.js charset=utf-8></script>
```

from dist/index.html after build