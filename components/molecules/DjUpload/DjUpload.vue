<template>
    <!--UPLOAD-->
    <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
        <div class="dropbox">
            <input
                type="file"
                :name="uploadFieldName"
                :disabled="isSaving"
                @change="
                    filesChange($event.target.name, $event.target.files);
                    fileCount = $event.target.files.length;
                "
                class="input-file"
                accept=".csv"
            />
            <p v-if="isInitial">{{ $t('fastOrder.upload') }}<br />{{ $t('fastOrder.upload2') }}</p>
            <p v-if="isSaving">{{ $t('fastOrder.uploading') }} {{ fileCount }} {{ $t('fastOrder.files') }}...</p>
        </div>
    </form>
</template>

<!-- Javascript -->
<script>
import { csvJSON } from '@/utilities/file-upload.service.js';

const STATUS_INITIAL = 0,
    STATUS_SAVING = 1,
    STATUS_SUCCESS = 2,
    STATUS_FAILED = 3;

export default {
    name: 'DjUpload',
    data() {
        return {
            uploadedFiles: [],
            uploadError: null,
            currentStatus: null,
            uploadFieldName: 'csv',
            products: [],
        };
    },
    computed: {
        isInitial() {
            return this.currentStatus === STATUS_INITIAL;
        },
        isSaving() {
            return this.currentStatus === STATUS_SAVING;
        },
        isSuccess() {
            return this.currentStatus === STATUS_SUCCESS;
        },
        isFailed() {
            return this.currentStatus === STATUS_FAILED;
        },
    },
    methods: {
        reset() {
            // reset form to initial state
            this.currentStatus = STATUS_INITIAL;
            this.uploadedFiles = [];
            this.uploadError = null;
        },
        save(formData) {
            // upload data to the server
            this.currentStatus = STATUS_SAVING;
        },
        filesChange(fieldName, fileList) {
            // handle file changes
            const formData = new FormData();
            let result = '';
            if (!fileList.length) return;
            const file = fileList[0];
            const reader = new FileReader();
            reader.onload = (e) => this.$emit('load', csvJSON(e.target.result));
            reader.readAsText(file);
        },
    },
    mounted() {
        this.reset();
    },
};
</script>

<!-- SASS styling -->
<style lang="scss">
.dropbox {
    outline: 2px dashed grey; /* the dash box */
    outline-offset: -10px;
    background: rgb(219, 219, 219);
    color: dimgray;
    padding: 10px 10px;
    min-height: 200px; /* minimum height */
    position: relative;
    cursor: pointer;
}

.input-file {
    opacity: 0; /* invisible but it's there! */
    width: 100%;
    height: 200px;
    position: absolute;
    cursor: pointer;
}

.dropbox:hover {
    background: rgb(181, 181, 182); /* when mouse over to the drop zone, change color */
}

.dropbox p {
    font-size: 1.2em;
    text-align: center;
    padding: 50px 0;
}
</style>
