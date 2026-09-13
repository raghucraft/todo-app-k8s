FROM jenkins/jenkins:lts

USER root

COPY plugins.txt /usr/share/jenkins/ref/plugins.txt

RUN jenkins-plugin-cli --plugin-file /usr/share/jenkins/ref/plugins.txt

COPY casc.yaml /usr/share/jenkins/ref/casc.yaml

COPY jobs/ /usr/share/jenkins/jobs/

ENV CASC_JENKINS_CONFIG=/usr/share/jenkins/ref/casc.yaml

USER jenkins