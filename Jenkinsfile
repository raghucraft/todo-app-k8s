pipeline {
    agent {
        label 'todo-agent'
        }
      
    stages {
        stage('checkout') {
            steps {
                checkout scm
            }
        }
        stage('Verify') {
            steps {
                sh 'echo "Todo App pipeline started"'
                sh 'ls -la'
            }
        }
        stage('Check Docker Environment') {
            steps {
                sh 'which docker || true'
                sh 'docker version || true'
                sh 'ls -l /var/run/docker.sock || true'
            }
        }
           
    }
}    