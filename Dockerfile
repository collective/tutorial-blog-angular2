FROM plone:5

COPY custom.cfg /plone/instance/

while ! nc -z localhost 8080; do sleep 10; done
