pipelineJob('todo-app-pipeline') {
    description('Todo App CI/CD Pipeline')

    definition {
        cpsScm {
            scm {
                git {
                    remote {
                        url('https://github.com/raghucraft/todo-app-k8s.git')
                    }
                    branch('*/main')
                }
            }
            scriptPath('Jenkinsfile')
        }            
    }    
}