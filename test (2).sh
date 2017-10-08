#!/bin/bash
PORT=3000

echo "GET /"
curl -H 'Content-Type: application/json' http://localhost:${PORT}
echo "Article Tests..............."

echo "GET /articles"
curl -H 'Content-Type: application/json' http://localhost:${PORT}/articles
echo ""

echo "POST /article"
curl -H 'Content-Type: application/json' http://localhost:${PORT}/article -d "{ \"text\":\"This is my new article! $(date)\" }"
echo ""

echo "GET /articles"
curl -H 'Content-Type: application/json' http://localhost:${PORT}/articles
echo "Headline Test..................."

echo "GET /headlines"
curl -H 'Content-Type: application/json' http://localhost:${PORT}/headlines
echo ""

echo "GET /headlines/someuser,otheruser"
curl -H 'Content-Type: application/json' http://localhost:${PORT}/headlines/someuser,otheruser
echo ""

echo "GET /headlines"
curl -H 'Content-Type: application/json' http://localhost:${PORT}/headlines
echo ""

echo "PUT /headline"
curl -H 'Content-Type: application/json' http://localhost:${PORT}/headline -X PUT -d "{ \"headline\":\"Whatever\" }"
echo ""

echo "GET /headlines"
curl -H 'Content-Type: application/json' http://localhost:${PORT}/headlines
echo "Email Tests"

echo "GET /email/someuser"
curl -H 'Content-Type: application/json' http://localhost:${PORT}/email/someuser
echo ""

echo "GET /email/"
curl -H 'Content-Type: application/json' http://localhost:${PORT}/email/
echo ""

echo "PUT /email"
curl -X PUT -H 'Content-Type: application/json' http://localhost:${PORT}/email -d "{ \"email\":\"newemail@other.com\" }"
echo ""

echo "GET /email/"
curl -H 'Content-Type: application/json' http://localhost:${PORT}/email/someuser
echo "..................................Zipcode........................"

echo "GET /zipcode/someuser"
curl -H 'Content-Type: application/json' http://localhost:${PORT}/zipcode/someuser
echo ""

echo "GET /zipcode/"
curl -H 'Content-Type: application/json' http://localhost:${PORT}/zipcode
echo ""

echo "PUT /zipcode"
curl -X PUT -H 'Content-Type: application/json' http://localhost:${PORT}/zipcode -d "{ \"zipcode\":\"99999\" }"
echo ""

echo "GET /zipcode/"
curl -H 'Content-Type: application/json' http://localhost:${PORT}/zipcode/
echo "Avatar.........................................."
echo "GET /avatars"
curl -H 'Content-Type: application/json' http://localhost:${PORT}/avatars
echo ""



echo "PUT /avatar"
curl -X PUT -H 'Content-Type: application/json' http://localhost:${PORT}/avatar -d "{ \"avatar\":\"somelink.png\" }"
echo ""

echo "GET /avatars"
curl -H 'Content-Type: application/json' http://localhost:${PORT}/avatars

echo "PUT /following/dago"
curl -X PUT -H 'Content-Type: application/json' http://localhost:${PORT}/following/dago
echo ""

echo "DELETE /following/dago"
curl -X DELETE -H 'Content-Type: application/json' http://localhost:${PORT}/following/dago
echo ""

echo "POST /login"
curl  -H 'Content-Type: application/json' http://localhost:${PORT}/login -d "{ \"username\":\"psd\", \"password\":\"fgfg\" }"
echo ""

echo "PUT /logout"
curl -X PUT 'Content-Type: application/json' http://localhost:${PORT}/logout 
echo ""

echo "POST /register"
echo ""















